import { model, Schema } from "mongoose";
import { IChat } from "./chat.interface";

const chatSchema = new Schema<IChat>(
  {
    userId: { type: String },
    message: { type: String, required: true },
    reply: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Chat = model<IChat>("Chat", chatSchema);
