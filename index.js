const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//router
const ProductRoutes = require('./routes/productRoutes');
const userRoutes = require("./routes/userRoutes");

const User = require("./models/userModels");
const {  generateAccessToken,  generateRefreshToken ,refreshAccessToken } = require('./authUtlis.js/authUtlis');
const authMiddleware = require('./authenicateMiddleware/authMiddleware');


//middleware
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173", // your React frontend
  credentials: true                // allow cookies
}));

app.use(cookieParser());



//router
app.use('/api/products' , authMiddleware ,ProductRoutes);
app.use("/api/users",authMiddleware ,  userRoutes);


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // console.log("userinformation", user);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        console.log("accesstoken ", accessToken)
        console.log("refreshtoken ", refreshToken)

        res.clearCookie("refreshToken");   // ✅ clear old one first
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,   // true in production
          
        });


        // console.log("Response" ,{
        //     accessToken,
        //     refreshToken,
        //     userId : user._id, 
        //     email : user.email
        // } )

        return res.json({
            accessToken,
            // refreshToken,
            userId : user._id, 
            email : user.email
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" }); 
}});                           




app.post("/logout", (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,   // must match login cookie
    sameSite: "strict",
    path: "/",       // must match login cookie
  });
  return res.json({ message: "Logged out successfully" });
});





app.post("/forgotpass" , async (req, res) => {
  try{
      const { email , confirmPassword} = req.body
      const user = await User.findOne({email})
      if (!user) {
          return res.status(400).json({ message: "user is not available" });
      }

      const hashedPassword = await bcrypt.hash(confirmPassword, 10);

      user.password = hashedPassword;

      await user.save();
      res.status(200).json({ message: "Password changed successfully" })

  } catch (error) {

      res.status(500).json({ message: err.message });
  }
})





app.post("/refresh" , async (req, res) => {
  const token = req.cookies?.refreshToken;
    console.log("refreshtoken", token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, refreshAccessToken, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
    console.log("newaccessToken" ,newAccessToken )

  });
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
           
                 