import { Response } from "express";

export interface AuthToken {
  accessToken?: string;
}
export const setAuthCookie = (res: Response, tokenInfo: AuthToken) => {
  console.log(tokenInfo, tokenInfo.accessToken, "aliddd");
  if (tokenInfo.accessToken) {
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
  }
};
