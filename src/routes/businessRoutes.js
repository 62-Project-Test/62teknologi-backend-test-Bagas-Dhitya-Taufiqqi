const express = require("express");
const router = express.Router();
const BusinessController = require("../controllers/businessController");

router.post("/", BusinessController.addBusiness);
router.put("/:id", BusinessController.editBusiness);
router.delete("/:id", BusinessController.deleteBusiness);
router.get("/search", BusinessController.searchBusiness);

module.exports = router;
