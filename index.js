const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const { application } = require("express");

dotenv.config();

mongoose
    .connect("mongodb+srv://UniAssistAdmin:Un1Assist@uniassistdb.wzesf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log("DBConnection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Backend server is runnning...");
});