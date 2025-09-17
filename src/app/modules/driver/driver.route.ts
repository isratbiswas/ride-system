import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";

const router = Router();

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
router.post("/availability", checkAuth(Role.DRIVER));
// router.get("/earnings", checkAuth(Role.DRIVER), DriverController.viewEarnings);

export const driverRoutes = router;
