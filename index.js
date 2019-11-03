const express = require('express');
const app = express();
const dotenv = require('dotenv');
const  mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    },
    () => console.log("Connected to DB...")
);

app.use(express.json());
app.use("/api/posts", postsRoute);
app.use("/api/user", authRoute);

app.listen(3000, () => {
    console.log("Server started ...");
});