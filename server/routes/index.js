const router = require("express").Router();
const user = require("./user");
const proposal = require("./proposal");

router.use("/user", user);
router.use("/proposal", proposal);

module.exports = router;
