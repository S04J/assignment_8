const express = require("express");
const bodyParser = require("body-parser");

let app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

let items = [];

app.get("/", function (req, res) {
    res.render("list", { ejes: items });
});

app.post("/", function (req, res) {
    var item = req.body.ele1;
    items.push(item);
    res.redirect("/");
});

app.post("/update/:id", function (req, res) {
    const itemId = parseInt(req.params.id);
    const updatedTask = req.body.updatedTask;
    if (itemId >= 0 && itemId < items.length) {
        items[itemId] = updatedTask;
    }
    res.redirect("/");
});

app.post("/delete/:id", function (req, res) {
    const itemId = parseInt(req.params.id);
    if (itemId >= 0 && itemId < items.length) {
        items.splice(itemId, 1);
    }
    res.redirect("/");
});

app.listen(1001, function () {
    console.log("Server started");
});