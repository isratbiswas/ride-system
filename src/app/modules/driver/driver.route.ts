import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { DriverController } from "./driver.controller";

const router = Router();

router.post("/accept/:id", checkAuth(Role.DRIVER), DriverController.acceptRide);
router.post("/status/:id", checkAuth(Role.DRIVER));
router.post("/availability", checkAuth(Role.DRIVER));
router.post("/earnings", checkAuth(Role.DRIVER));

export const driverRoutes = router;
