const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res,client) {
  const body = req.body;
  console.log(body.url);
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid().substring(0, 5);
  const sql = "INSERT INTO url (shortId,redirectURL) VALUES ($1,$2)";
  const values = [shortID,body.url];
  await client.query(sql,values);
  return res.json({ id: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
};
