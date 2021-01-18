const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

dotenv.config();

const PORT = process.env.PORT || 3000;
const CONNECTION_URI = process.env.NODE_ENV === 'development' ? process.env.DB_CONNECT_LOCAL : process.env.DB_CONNECT;

mongoose.connect(CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => console.log("Connected to cloud mongo db...")
);

if (process.env.NODE_ENV === 'development') {
  // Check locally DB connection

  const db = mongoose.connection;
  db.on('error', (err) => {
    console.log("Error: ", err)
  })
  db.once('open', () => {
    console.log("Database connection estabilished...")
  })
}

app.use(express.json());
app.use("/api/posts", postsRoute);
app.use("/api/user", authRoute);

console.log("ppppp = ", process.env.NODE_ENV)
app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port...`);
});