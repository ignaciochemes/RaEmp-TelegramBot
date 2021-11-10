import { defineEnvironmentVariables } from "./src/Configs/EnvironmentConfig";
import { TelegramBot } from "./src/Bot/Bot";

defineEnvironmentVariables();
TelegramBot.Instance();