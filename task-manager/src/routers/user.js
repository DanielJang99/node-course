const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("", async (req, res) => {
    const user = new User(req.body);
    // user.save()
    //     .then(() => {
    //         res.send(user);
    //     })
    //     .catch((e) => {
    //         res.status(400).send(e);
    //     });
    try {
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send();
    }
});

router.get("", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }
    // User.find({})
    //     .then((users) => {
    //         res.send(users);
    //     })
    //     .catch((e) => {
    //         res.status(500).send();
    //     });
});

router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
    // User.findById(_id)
    //     .then((user) => {
    //         if (!user) {
    //             return res.status(404).send();
    //         }
    //         res.send(user);
    //     })
    //     .catch((e) => {
    //         return res.status(500).send();
    //     });
});

router.patch("/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "email"];

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: "invalid updates" });
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });
        const user = await User.findById(req.params.id);
        updates.forEach((update) => {
            user[update] = req.body[update];
        });
        await user.save();
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.send(404).send();
        }
        res.send(user);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
