import userModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ sucess: false, msg: "user does not exist" });
        }

        const isPassMatch = await bcrypt.compare(password, user.password);
        if (isPassMatch) {
            const token = createToken(user._id);
            res.json({ sucess: true, token })
        } else {
            res.json({ sucess: false, msg: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error);
        res.json({ sucess: false, msg: error.message })
    }
}

// user login
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // checking user alredy exist
        const userExist = await userModel.findOne({ email });

        if (userExist) {
            return res.json({ sucess: false, msg: "user alredy exist" })
        }
        // validate email and strong password

        if (!validator.isEmail(email)) {
            return res.json({ sucess: false, msg: "Please enter the valid email" })
        }
        if (password.length < 8) {
            return res.json({ sucess: false, msg: "Please enter a strong password" })
        }
        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPass
        });
        const userSave = await newUser.save();

        const token = createToken(userSave._id)
        res.json({ sucess: true, token })

    } catch (error) {
        console.log(error);
        res.json({ sucess: false, msg: error.message })
    }
}

// admin panel login

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ sucess: true, token })
        } else {
            res.json({ sucess: false, msg: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ sucess: false, msg: error.message })
    }
}

export { loginUser, registerUser, adminLogin }