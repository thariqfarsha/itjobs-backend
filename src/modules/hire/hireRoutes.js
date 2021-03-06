const express = require("express");

const Router = express.Router();

const hireController = require("./hireController");
const middlewareAuth = require("../../middleware/auth");
const middlewareUpload = require("../../middleware/uploadPdf");

Router.get("/:userId", hireController.getHire);
Router.post(
  "/:companyId",
  middlewareUpload,
  middlewareAuth.isAdminAuthentication,
  hireController.createHire
);
Router.delete("/:id", hireController.deleteHire);
module.exports = Router;
