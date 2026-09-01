import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";
import Stripe from 'stripe';

// global variables
const currency = 'usd';
const deliveryCharge = 10;

// helper function to extract full item details for orders
const extractOrderItems = async (reqBody) => {
  const { items, cartItems } = reqBody;
  let orderItems = [];

  if (items && Array.isArray(items) && items.length > 0) {
    for (const item of items) {
      if (item.name && item.price) {
        orderItems.push(item);
      } else {
        const product = await productModel.findById(item.itemId || item._id);
        if (product) {
          orderItems.push({
            itemId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size: item.size,
            quantity: item.quantity
          });
        } else {
          orderItems.push(item);
        }
      }
    }
  } else if (cartItems && Array.isArray(cartItems) && cartItems.length > 0) {
    for (const item of cartItems) {
      if (item.quantity > 0) {
        const product = await productModel.findById(item.itemId || item._id);
        if (product) {
          orderItems.push({
            itemId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            size: item.size,
            quantity: item.quantity
          });
        } else {
          orderItems.push(item);
        }
      }
    }
  } else if (cartItems && typeof cartItems === 'object') {
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          const product = await productModel.findById(itemId);
          if (product) {
            orderItems.push({
              itemId: product._id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
              size,
              quantity
            });
          } else {
            orderItems.push({
              itemId,
              size,
              quantity
            });
          }
        }
      }
    }
  }

  return orderItems;
};

// Placing orders using COD Method
const placeOrder = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;
    const items = await extractOrderItems(req.body);

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Clear user's cart after order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using STRIPE Method
const placeOrderStripe = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.json({ success: false, message: "Stripe is not configured in backend environment" });
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { userId, amount, address } = req.body;
    const { origin } = req.headers;
    const items = await extractOrderItems(req.body);

    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name || 'Product'
        },
        unit_amount: (item.price || 0) * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Charges'
        },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  res.json({ success: false, message: "Razorpay payment not yet configured" });
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Orders data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status Updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }; 