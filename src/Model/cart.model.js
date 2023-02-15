const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    mrp: {
        type: Number,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    discount: {
        type: String,
        require: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
});

const cartModel = model("cart", cartSchema);

module.exports = cartModel;
