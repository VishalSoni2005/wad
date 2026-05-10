import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/users", getAllUsers);
router.post("/user/create", createUser);
router.put("/user/update", updateUser);
router.delete("/user/delete", deleteUser);

export default router;
