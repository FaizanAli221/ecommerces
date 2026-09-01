import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
  try {
    let token = req.headers.token;
    const authHeader = req.headers.authorization;
    if (!token && authHeader) {
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      } else {
        token = authHeader;
      }
    }

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized. Please login again.' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: 'Not Authorized. Please login again.' });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
