const router = require("express").Router();
const User = require("../models/User");
const  bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.get("/", (req,res) => {
    res.send("Hi, I am API of auth");
})

router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(password, salt);
            const newuser = new User({
                username: username,
                email: email,
                password: newpassword
             });
            const save = await newuser.save();
           
             res.status(200).json("Done");
        }
        else {
            res.status(403).send("User Already Exists...");
        }   
    } catch (err) {
        res.status(400).send(err);
    }   
})
router.post("/login", async (req, res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
         return res.status(401).send("Username Not found in the database"); 
        } 

        const check_pass = await bcrypt.compare(password, user.password);
        if (!check_pass) { 
          return res.status(401).send("Password Does not match...");  
        } 

        const token_content = {
            id:user._id
        }
        const token = jwt.sign(token_content, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1m"});
        return res.status(200).send(token);
    } catch (err) {
        return res.status(400).send(err);
    }
})

// router.get("/something",authencateToken, async (req, res) => {
//     res.send("I have access to this route "+req.id);  
// })





module.exports = router;