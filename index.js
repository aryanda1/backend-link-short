const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 8001;
let corsOptions = {
  origin : ['https://git.ary0n.fun/short-link','https://git.ary0n.fun/short-link/','https://git.ary0n.fun/short-link/#','https://git.ary0n.fun'],
}
 
app.options('*', cors()) 
connectToMongoDB(process.env.DB_URL).then(() =>
  console.log("Mongodb connected")
);

app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("https://git.ary0n.fun/short-link");
});

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (!entry) return res.status(404).json({ error: "URL not found" });
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
