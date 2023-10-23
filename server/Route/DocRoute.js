const express = require('express');
const router = express.Router();
const DocController = require("../RouteController/DocController");
 
router.route("/:DocId").get(DocController.GetDoc)
 
router.route("/:UserId").post(DocController.CreateDoc)

router.route("/shared/:UserId").get(DocController.SharedDoc)


router.route("/All/:UserId").get(DocController.GetAllDoc)

router.route("/delete/:DocId/:UserId").delete(DocController.DeleteDoc)

router.route("/update/:DocId").post(DocController.EditDoc)
 
router.route("/invite/:DocId").post(DocController.InviteFriends)


module.exports = router;    