const express = require('express');
const router = express.Router();
const DocController = require("../RouteController/DocController");

router.route("/:DocId").get(DocController.GetDoc)

router.route("/:UserId").post(DocController.CreateDoc)

router.route("/:DocId").delete(DocController.DeleteDoc)

router.route("/update/:DocId").post(DocController.EditDoc)
 
module.exports = router;   