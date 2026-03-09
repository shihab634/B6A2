import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { Roles } from "../auth/auth.constant";
const router = Router();

router.get("/",auth(Roles.admin,Roles.customer), userController.getUser);


router.put("/:userId", userController.updateUser);

router.get("/:userId",auth("admin"), userController.getSingleUser);

router.delete("/:userId", userController.deleteUser);

export const userRoute = router;
