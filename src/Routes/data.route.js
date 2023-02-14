const express = require("express");
const {
  AddData,
  DeleteData,
  EditData,
  GetData,
  GetDataById
} = require("../Controller/data.controller");
const dataRoute = express();

dataRoute.get("/", async (req, res) => {
  let { page } = req.query
  const { data, flag, message, desc, length } = await GetData({ page });
  if (flag) {
    return res.status(201).send({ length, message, desc, data });
  } else {
    return res.status(401).send({ message, desc, data });
  }
});

dataRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log('id:', id)
  const { data, flag, message, desc, length } = await GetDataById({ _id: id });
  if (flag) {
    return res.status(201).send({ length, message, desc, data });
  } else {
    return res.status(401).send({ message, desc, data });
  }
});

dataRoute.post("/add", async (req, res) => {
  const { image, title, price, mrp, category, quantity, discount } = req.body;
  const { data, flag, message, desc, length } = await AddData({
    image,
    title,
    price,
    mrp,
    category,
    quantity,
    discount,
  });
  if (flag) {
    return res.status(201).send({ length, message, desc, data });
  } else {
    return res.status(401).send({ message, desc, data });
  }
});

dataRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log('_id:', id)
  const { data, flag, message, desc, length } = await DeleteData({ _id: id });
  if (flag) {
    return res.status(201).send({ length, message, desc, data });
  } else {
    return res.status(401).send({ message, desc, data });
  }
  res.send("hello");
});

dataRoute.patch("/", async (req, res) => {
  const { _id, image, title, price, mrp, category, quantity, discount } =
    req.body;
  const { data, flag, message, desc, length } = await EditData({
    _id,
    image,
    title,
    price,
    mrp,
    category,
    quantity,
    discount,
  });
  if (flag) {
    return res.status(201).send({ length, message, desc, data });
  } else {
    return res.status(401).send({ message, desc, data });
  }
});

module.exports = dataRoute;
