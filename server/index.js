const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const { application } = require("express");

const app = express();

dotenv.config();

mongoose
    .connect("mongodb+srv://UniAssistAdmin:Un1Assist@uniassistdb.wzesf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => console.log("DBConnection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
    );
    
app.use(passport.initialize());
app.use(passport.session());

app.use(
cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
})
);

app.use("/auth", authRoute);

app.use("/api/users", userRoutes);

app.listen(5000, () => {
    console.log("Backend server is runnning...");
});