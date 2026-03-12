import OpenAI from "openai";
import { envVars } from "../config/env";

export const openai = new OpenAI({
  apiKey: envVars.OPEN_API_KEY,
});
