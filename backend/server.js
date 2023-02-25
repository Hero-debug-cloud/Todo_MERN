const express = require("express");
const app = express();

//something is here

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");



//routing paths;

const authRoute = require("./routes/auth");
const listRoute = require("./routes/list");

//for our secrets keys 
dotenv.config();

//connecting to mongoose;
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology:true},
    () => {
        console.log("Connected to MongoDB");
})

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Getting Home Page;
app.get("/", (req, res) => {
    res.send("Welcome to the homepage");
})


app.use("/api/auth", authRoute);
app.use("/api/list", listRoute);


//listening to the port 
app.listen(5000, () => {
    console.log("Server is Running...");
})