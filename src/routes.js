const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const imagesController = require("./controllers/images");
const userControllers = require("./controllers/users");

// Images
routes.post(
  "/images",
  multer(multerConfig).single("file"),
  imagesController.create
);

routes.get("/images", imagesController.retrieveAll);

routes.delete("/images/:id", imagesController.deleteImage);

// Users
routes.post("/users", userControllers.create);
routes.get("/users", userControllers.retrieveAll);
routes.get("/users/:id", userControllers.retrieveById);
routes.delete("/users/:id", userControllers.deleteUser);

module.exports = routes;
