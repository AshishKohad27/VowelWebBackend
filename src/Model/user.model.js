const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { type: String },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: String,
    quantity: {
        type: Number
    },
    role: {
        type: String,
        enum: ["Admin", "Guest"],
        default: "Guest",
    }
});

const userModel = model("user", userSchema);

module.exports = userModel;