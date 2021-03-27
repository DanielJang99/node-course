const express = require("express");
require("./db/mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const bcrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // this is to parse incoming JSON into a JavaScript object which you can access on req.body
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.listen(port, () => {
    console.log("server is up and running on port " + port);
});

// difference between encryption and hashing : you can get original value back with encryption (decryption). On the other hand, hashing is one-way, meaning it is not reversible.
