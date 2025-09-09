const express = require('express');
const mongoose = require('mongoose');
const app = express();

//router
const ProductRoutes = require('./routes/productRoutes');
const userRoutes = require("./routes/userRoutes");

const User = require("./models/userModels");
const {  generateAccessToken,  generateRefreshToken  } = require('./authUtlis.js/authUtlis');
const authMiddleware = require('./authenicateMiddleware/authMiddleware');

//middleware
app.use(express.json());


//router
app.use('/api/products' , authMiddleware ,ProductRoutes);
app.use("/api/users",authMiddleware ,  userRoutes);


app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    // console.log("userinformation", user);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken , refreshToken });

});                           











//connect to MongoDB
mongoose.connect("mongodb+srv://hariharanbvn28:DevilkingMongodb007@cluster0.tscfgvn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    });
})
.catch(() => {
    console.log("Error connecting to MongoDB")
});

