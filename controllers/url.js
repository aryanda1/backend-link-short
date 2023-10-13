const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res, client) {
  const body = req.body;
  // console.log(body.url);
  if (!body.url) return res.status(400).json({ error: "url is required" });
  let shortID;
  while (true) {
    shortID = shortid().substring(0, 5);
    const result = await client`SELECT * FROM url WHERE shortId = ${shortID}`;
    if (result.length === 0) break;
  }
  await client`INSERT INTO url (shortId,redirectURL) VALUES (${shortID},${body.url})`;
  return res.json({ id: shortID });
}

module.exports = {
  handleGenerateNewShortURL,
};
