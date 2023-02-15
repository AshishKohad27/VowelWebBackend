require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./Config/db");
const dataRoute = require("./Routes/data.route");
const userRoutes = require("./Routes/user.route");
const cartRoute = require("./Routes/cart.route");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/data", dataRoute);
app.use("/user", userRoutes);
app.use("/cart", cartRoute);

app.get("/", async (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, async () => {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`);
})
