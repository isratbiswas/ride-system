import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { RideController } from "./ride.controller";

const router = Router();

router.post(
  "/request",
  checkAuth(Role.RIDER),
  RideController.requestSendByRider
);
router.patch(
  "/cancel/:id",
  checkAuth(Role.RIDER),
  RideController.cancelRequestByRider
);

router.get("/me", checkAuth(Role.RIDER), RideController.getMyRides);

export const riderRoutes = router;
