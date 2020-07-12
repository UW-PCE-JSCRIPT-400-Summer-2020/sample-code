const { Router } = require("express");
const router = Router();

router.use("/widgets", require('./widgets'));

module.exports = router;
