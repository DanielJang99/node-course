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

// const hello = async () => {
//     const ps = "hello12345";
//     const hashedPs = await bcrypt.hash(ps, 8);
//     console.log(ps);
//     console.log(hashedPs);

//     const isMatch = await bcrypt.compare("hello1234", hashedPs);
//     console.log(isMatch);
// };

// hello();

// difference between encryption and hashing : you can get original value back with encryption (decryption). On the other hand, hashing is one-way, meaning it is not reversible.
