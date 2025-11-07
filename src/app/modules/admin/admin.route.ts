import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { AdminController } from "./admin.controller";

const router = Router();

router.get(
  "/pending",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getPendingDrivers
);
router.patch(
  "/approve/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.approveDriver
);
router.patch(
  "/reject/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.rejectDriver
);

router.patch(
  "/block/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.blockUser
);

export const AdminRoutes = router;
