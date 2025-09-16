// import { JwtPayload } from "jsonwebtoken";

// interface CustomJwtPayload extends JwtPayload {
//   _id: string;
//   email: string;
//   role: "RIDER" | "DRIVER" | "ADMIN" | "SUPER_ADMIN";
// }

// declare global {
//   namespace Express {
//     interface Request {
//       user: CustomJwtPayload;
//     }
//   }
// }

import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
