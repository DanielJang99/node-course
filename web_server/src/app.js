const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const templateDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

// Set up handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", templateDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "hyunseok",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        name: "hyunseok",
        helpText: "This is some helpful message",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "hyunseok",
    });
});

app.get("/weather", (req, res) => {
    res.send("This is weather page!");
});

app.get("/help/*", (req, res) => {
    res.render("help404", {
        title: "Help error",
        name: "hyunseok",
        errorMsg: "Help article not found...",
    });
});

// 404 page needs to come LAST, after all other routes have been set!
app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "hyunseok",
        errorMsg: "Page not found...",
    });
});

app.listen(3000, () => {
    console.log("Server set up on port 3000");
});
