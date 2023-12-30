require("dotenv").config();
const cors = require("cors");
const{SERVER_PORT} = process.env;
const{seed, getStocks} = require("./controller/control");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/seed", seed)
app.get("/stocks/:type/:price", getStocks)
app.listen(SERVER_PORT, () => console.log(`server running on port ${SERVER_PORT}`))
