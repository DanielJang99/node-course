const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const ObjectId = require("mongoose").Types.ObjectId;

router.post("", async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send();
    }
    // task.save()
    //     .then(() => {
    //         res.status(201).send(task);
    //     })
    //     .catch((e) => {
    //         res.status(400).send(e);
    //     });
});

router.get("", async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
    // Task.find({})
    //     .then((task) => {
    //         res.send(task);
    //     })
    //     .catch((e) => {
    //         return res.status(500).send();
    //     });
});

router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    if (!ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send;
    }
    // Task.findById(_id)
    //     .then((task) => {
    //         if (!task) {
    //             return res.status(404).send();
    //         }
    //         res.send(task);
    //     })
    //     .catch((e) => {
    //         return res.status(500).send;
    //     });
});

router.patch("/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidUpdate = updates.every((update) =>
        allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
        return res.status(400).send({ error: "invalid updates" });
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.send(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
