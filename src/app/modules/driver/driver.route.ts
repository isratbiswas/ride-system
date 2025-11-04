import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";

const router = Router();

router.get("/me", checkAuth(Role.DRIVER), DriverController.getDriverProfile);
router.post(
  "/approveRequest",
  checkAuth(Role.DRIVER),
  DriverController.requestForApprove
);
router.get(
  "/completed/me",
  checkAuth(Role.DRIVER),
  DriverController.completeRide
);
router.post("/accept/:id", checkAuth(Role.DRIVER), DriverController.acceptRide);
router.patch(
  "/cancel/:id",
  checkAuth(Role.DRIVER),
  DriverController.cancelRide
);

router.patch(
  "/status/:id",
  checkAuth(Role.DRIVER),
  DriverController.updateStatus
);
router.patch(
  "/availability",
  checkAuth(Role.DRIVER),
  DriverController.setAvailability
);
// router.get("/earnings", checkAuth(Role.DRIVER), DriverController.viewEarnings);

export const driverRoutes = router;
