import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { riderRoutes } from "../modules/ride/ride.route";

export const router = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/ride",
    route: riderRoutes,
  },
  // {
  //     path: '/driver',
  //     route: DriverRoutes
  // }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
