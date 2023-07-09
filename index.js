const express = require("express");
const cors = require("cors");
const { connect } = require("./connect");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;
let corsOptions = {
  origin: [
    "https://git.ary0n.fun/short-link",
    "https://git.ary0n.fun/short-link/",
    "https://git.ary0n.fun/short-link/#",
    "https://git.ary0n.fun",
  ],
};

app.use(express.json());
app.use(cors({
  origin: corsOptions.origin,
}));

let client;
connect().then((conClient) => {
  client = conClient;
  console.log("YugabyteDB connected");
  app.use("/url", urlRoute(client));
  
  app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
});

app.get("/", (req, res) => {
  console.log("Redirecting to https://git.ary0n.fun/short-link");
  res.redirect("https://git.ary0n.fun/short-link");
});


app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const sql = "SELECT * FROM url WHERE shortId = $1";
  const values = [shortId];
  const result = await client.query(sql, values);
  console.log(shortId,result.rowCount,result.command);

  if (result.rowCount == 0)
    return res.status(404).json({ error: "URL not found" });
  res.redirect(result.rows[0].redirecturl);
});


