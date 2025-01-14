const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const {
  getCompliment,
  getAdviceByCategory,
  postAdvice,
  deleteAdvice,
} = require("./controller");

app.get("/api/compliment", getCompliment);

app.get("/api/goal/advice/", getAdviceByCategory);

app.post("/api/goal/advice", postAdvice);

app.delete("/api/goal/:category", deleteAdvice);

app.listen(4000, () => console.log("Server running on 4000"));
