import jwt from 'jsonwebtoken';
const adminAuth = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const { token } = req.headers;
        if (!token) {
            return res.json({ sucess: false, msg: "not Authorized Login again" })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ sucess: false, msg: "Not Autorized login again" })
        }
        next();
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, msg: error.message })
    }
}

export default adminAuth;