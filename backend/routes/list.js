// const authencateToken = require("./auth");
const User = require("../models/User");
const generateUniqueId = require("generate-unique-id");
const router = require("express").Router();
const jwt = require("jsonwebtoken");


const authencateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(401).json("You don't have right to access it");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json(err);
        req.id = user.id;
        next();
    })
}

//getting all task of a particular user;
router.get("/all", authencateToken,async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.id });
        if (!user) {
            res.send("User not Found!!");
        }
        else {
            res.status(200).json(user.tasks);
        }
    } catch (err) {
        res.send(err);
    }
})

//inserting a task of a particular user;
router.post("/task",authencateToken, async (req, res) => {
    try {
        console.log(req.id);
        const user = await User.findOne({ _id: req.id });
        if(!user){
            res.status(400).json("No user found");
        }
        else {
            const random = generateUniqueId({
                length: 15,
                useLetters: true,
                useNumbers: true,
                includeSymbols:["@","#","%"]
            })
            User.updateOne({ _id: req.id }, { $push: { tasks: { "id":random,"name":req.body.name } } }, function (err) {
                if (err) res.send(err);
                res.send("Added succesfully");
            })           
        }
    } catch (err) {
        res.send(err);
    }  
})


//deleting a task for a particular user;
router.post("/deleting",authencateToken, async (req, res) => {
    try {
        const task_id = req.body.id;
        const user = await User.findOne({ _id: req.id });
        if (user) {
          await User.updateOne({ _id: req.id },
              { $pull: { "tasks": { "id": task_id } } });
            return res.status(200).json("Deleted Successfully...");
        }
        else {
           return  res.send("User not found!!");   
        }
    } catch (err) {
        return res.send(err);
    }
})


//updating task for a particular user;

//basicly right now its updating values of the task
router.post("/updating/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            await User.updateOne({ _id:req.params.id },{tasks:{"id":req.body.id}},
            {
                $set:{"id":req.body.id,"name":req.body.name}
                })
            res.send("update done");
        }
        else {
            res.send("User not found in the database");
        }
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;