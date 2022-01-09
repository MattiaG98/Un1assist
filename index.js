const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const { application } = require("express");

dotenv.config();

mongoose
    .connect("mongodb+srv://un1assist:Un1assistITA9897@uniassist.4nhzy.mongodb.net/UniAssist?retryWrites=true&w=majority")
    .then(() => console.log("DBConnection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.get("/api/test", ()=> {
    console.log("test is successfull");
});

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Backend server is runnning...");
});