const { Schema, model } = require("mongoose");

const dataSchema = new Schema({
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
});

const dataModel = model("data", dataSchema);

module.exports = dataModel;
