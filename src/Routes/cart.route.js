const express = require("express");
const {
    GetCart,
    addItemInCart,
    ItemUpdateQuantity,
    GetUserCart,
    deleteCart,
    updateCart,
    placeOrderItem,
    GetHistory
} = require("../Controller/cart.controller");
const cartRoute = express();

cartRoute.get("/", async (req, res) => {
    const { data, flag, message, desc, length } = await GetCart();
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});


cartRoute.post("/usercart", async (req, res) => {
    const { userID } = req.body;
    console.log('userID from backend:', userID)
    const { data, flag, message, desc, length, total } = await GetUserCart({ userID });
    if (flag) {
        return res.status(201).send({ length, total, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});


cartRoute.post("/", async (req, res) => {
    const { userID, title, image, quantity, price, mrp, discount, category, quantityUser } = req.body;
    const { data, flag, message, desc, length } = await addItemInCart({
        userID,
        title,
        image,
        quantity,
        price,
        mrp,
        discount,
        category,
        quantityUser
    });
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});

cartRoute.post("/quantity", async (req, res) => {
    const { _id, title, image, quantity, price, mrp, discount, category } =
        req.body;
    const { data, flag, message, desc, length } = await ItemUpdateQuantity({
        _id,
        title,
        image,
        quantity,
        price,
        mrp,
        discount,
        category,
    });
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});

cartRoute.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log('id:', id)

    const { data, flag, message, desc, length } = await deleteCart({ _id: id });
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});

cartRoute.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    console.log('id:', id)

    const { data, flag, message, desc, length } = await updateCart({ _id: id, quantity });
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});

cartRoute.post("/placeOrder", async (req, res) => {
    const { userID } = req.body;
    const { data, flag, message, desc, length } = await placeOrderItem({ userID });
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});


cartRoute.get("/history", async (req, res) => {
    const { data, flag, message, desc, length } = await GetHistory();
    if (flag) {
        return res.status(201).send({ length, message, desc, data });
    } else {
        return res.status(401).send({ message, desc, data });
    }
});
module.exports = cartRoute;
