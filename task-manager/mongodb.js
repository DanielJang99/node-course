// CRUD

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            return console.log("unable to connect to db");
        }
        const db = client.db(databaseName);

        // db.collection("users")
        //     .deleteMany({ name: "Hyunseok" })
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
        db.collection("tasks")
            .updateMany(
                { completed: false },
                {
                    $set: {
                        completed: true,
                    },
                }
            )
            .then((res) => {
                console.log(res.modifiedCount);
            })
            .catch((e) => console.log(e));
    }
);
