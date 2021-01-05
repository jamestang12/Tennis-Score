const express = require("express");
const connectDB = require("./config/db");
const connect = require("./config/db");

const app = express();

connectDB();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));
app.use("/api/game", require("./routes/api/game"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port${PORT}`));
