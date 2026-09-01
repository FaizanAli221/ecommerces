import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    let token = req.headers.token;
    if (!token && req.headers.authorization) {
        if (req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            token = req.headers.authorization;
        }
    }

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Please login again." });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser