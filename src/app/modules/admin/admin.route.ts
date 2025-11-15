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

router.get(
  "/analytics/overview",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.analyticsOverview
);
router.patch(
  "/approve/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.approveDriver
);
router.patch(
  "/suspend/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.suspendDriver
);

router.patch(
  "/block/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.blockUser
);
router.patch(
  "/unblock/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.unblockUser
);

export const AdminRoutes = router;
