const express = require("express");
const cors = require("cors");
const {
  handleGenerateNewShortURL,
} = require("../controllers/url");

const router = express.Router();
let corsOptions = {
  origin : ['https://git.ary0n.fun/short-link','https://git.ary0n.fun/short-link/','https://git.ary0n.fun/short-link/#'],
}
router.post("/", cors(),handleGenerateNewShortURL);

module.exports = router;
