const express = require("express");
const cors = require("cors");
const { handleGenerateNewShortURL } = require("../controllers/url");

let corsOptions = {
  origin: [
    "https://git.ary0n.fun/short-link",
    "https://git.ary0n.fun/short-link/",
    "https://git.ary0n.fun/short-link/#",
    "https://git.ary0n.fun",
  ],
};
const router = express.Router();
const urlRoute = (client) => {
  router.post(
    "/",
    cors({
      origin: corsOptions.origin,
    }),
    async (req, res) => {
      try {
        await handleGenerateNewShortURL(req, res, client);
      } catch (error) {
        console.error("Error handling generate new short URL:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  );
  return router;
};

module.exports = urlRoute;
