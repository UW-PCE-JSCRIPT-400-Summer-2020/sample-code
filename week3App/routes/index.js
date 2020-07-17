const { Router } = require("express");
const router = Router();

router.use("/users", require('./users'));
router.use("/users/:userId/transactions", require('./transactions'));

module.exports = router;
