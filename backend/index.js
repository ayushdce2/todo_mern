const express = require("express"); //require
const app = express(); //initialize
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const TodoAll = require("./Routes/TodoAll");

require("dotenv").config();
require('./Models/db');

const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
    res.send('SERVER RUNNING NOW');
})




app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/todoall", TodoAll);

app.listen(PORT,()=>{
    console.log(`server is runnig at ${PORT}`);
});