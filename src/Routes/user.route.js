const express = require("express");

const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const userModel = require("../model/user.model");

const userRoutes = express.Router();

//Middle Ware
const authMiddleWare = async (req, res, next) => {
    const token = req.headers["authorization"];
    try {
        if (!token) {
            return res.status(400).send({
                data: [],
                message: "Unauthorized Person",
                flag: false,
                desc: ''
            });
        } else if (token) {
            const verification = jwt.decode(token, "VOWEL_WEB_SECRET");
            if (verification.role === "Admin") {
                next();
            } else {
                return res.status(400).send({
                    data: [],
                    message: "Unauthorized Person",
                    flag: false,
                    desc: ''
                });
            }
        }
    } catch (error) {
        console.log('error:', error)
        return res.status(400).send({
            data: [],
            message: "Error Occur",
            flag: false,
            desc: error.message
        });
    }


};

//Get
userRoutes.get("/", async (req, res) => {
    const user = await userModel.find();
    res.send(user);
});

//Signup
userRoutes.post("/signup", async (req, res) => {
    let { email, password, name } = req.body;
    console.log('req.body:', req.body)

    try {
        const user = await userModel.findOne({ email });
        console.log('user:', user);
        const hash = await argon2.hash(password);

        if (user) {
            return res.status(400).send({ message: "User with same email Id Already Exists", user });
        }

        const auth = new userModel({ email, password: hash, name, quantity: 0 });
        await auth.save();
        return res.status(201).send({ message: "User Created Successfully", user: auth });

    } catch (e) {
        console.log(e.message);
        return res.status(400).send({ message: "Error Occurs", desc: e.message, user: [] });
    }
});

userRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log('user:', user);

    try {
        if (!user) {

            return res.status(400).send({ messages: "User with this email Id not Exists", data: [] });
        }
        if (await argon2.verify(user.password, password)) {
            // jwt token
            if (user) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    "VOWEL_WEB_SECRET",
                    { expiresIn: "4 days" }
                );
                const refreshToken = jwt.sign({ id: user._id }, "REFRESH_AUTH", {
                    expiresIn: "7 days",
                });
                return res.send({ message: "Login Successfully", data: user, token, refreshToken });
            }
        } else {
            res.status(400).send({ message: "You enter wrong username or password", data: [] });
        }
    } catch (e) {
        return res.status(400).send({ message: "Error Occurs", desc: e.message, data: [] });
    }
});


userRoutes.post("/verify", async (req, res) => {
    const { token } = req.body;
    if (token === undefined) {
        console.log('token from verify:', token);
        return res.send("Unauthorized");
    }
    try {
        const verification = jwt.verify(token, "VOWEL_WEB_SECRET");
        // console.log('verification:', verification)
        if (verification) {
            return res.status(200).send({ data: verification, message: "", desc: "" });
        }
    } catch (e) {
        // console.log('e:', e.message);
        return res.status(403).send({ message: "Invalid Token", desc: e.message, data: [] });
    }
});

userRoutes.get("/allcustomer", authMiddleWare, async (req, res) => {
    try {
        let user = await userModel.find({ role: "Guest" });
        return res.status(201).send({
            data: user,
            flag: true,
            message: "All Customers",
            desc: "",
        });
    } catch (e) {
        return res.status(400).send({
            data: [],
            flag: false,
            message: "Error Occurs",
            desc: e.message,
        });
    }
})


module.exports = userRoutes;
