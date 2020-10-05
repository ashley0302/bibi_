const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userCtrl = require('./api/user/user.ctrl');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback() {
    console.log("open: success");
});

mongoose
    .connect("mongodb://localhost/chat", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => {
        console.log("not connected to database", err);
    });

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
//app.use(userCtrl.checkAuth);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});


app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/bibibox", (req, res) => {
    res.sendFile(__dirname + "/bibibox.html");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/api/user", require("./api/user"));
app.use("/api/chat", require("./api/chat"));


http.listen(3000, () => {
    console.log("Connected at 3000");
});