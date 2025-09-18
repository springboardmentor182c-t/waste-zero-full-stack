import express from "express";
import * as userController from "./user.controller.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

// User Profile APIs
router.get("/users/:id", userController.getUserById); 
router.get("/users", userController.getAllUsers);   
router.post("/users", userController.createUser);      
router.put("/users/:id", userController.updateUser);  
router.delete("/users/:id", userController.deleteUser); 

export default router;
