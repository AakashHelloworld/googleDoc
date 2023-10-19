const express = require('express');
const router = express.Router();
const DocController = require("../RouteController/DocController");

router.route("/UserId").get(DocController.GetDoc)

router.route("/").post(DocController.CreateDoc)

router.route("/DocId").delete(DocController.DeleteDoc)

router.route("/DocId").patch(DocController.EditDoc)

module.exports = router; 