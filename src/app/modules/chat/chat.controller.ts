import { Request, Response } from "express";
import { sendMessageToAi } from "./chat.service";
import sendResponse from "../../utils/sendResponce";
import httpStatus from "http-status-codes";
export const chatController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const reply = await sendMessageToAi.replyMessage(message);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Chat Ai reply successfully",
      data: reply,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
