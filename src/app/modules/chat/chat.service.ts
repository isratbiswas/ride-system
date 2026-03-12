import { openai } from "../../utils/openai";
import { Chat } from "./chat.model";

const completion = async (message: string) => {
  const result = await openai.chat.completions.create({
    model: "gpt-40-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant for a ride booking platform like Uber or Pathao. Help users book rides, cancel rides, track drivers, and answer website questions.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return result;
};

const replyMessage = async (message: string) => {
  const completionResult = await completion(message);
  const reply = completionResult.choices[0].message.content;
  await Chat.create({
    message,
    reply,
  });
  return reply;
};

export const sendMessageToAi = {
  replyMessage,
};
