const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { application } = require("express");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

dotenv.config();

mongoose
    .connect("mongodb+srv://UniAssistAdmin:Un1Assist@uniassistdb.wzesf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log("DBConnection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

/*
app.get("/api/test", (req,res) => {
    res.send("test is successfull");
});
*/

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(5000, () => {
    console.log("Backend server is runnning...");
});