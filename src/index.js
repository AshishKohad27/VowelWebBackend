require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./Config/db");


const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, async () => {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`);
})
