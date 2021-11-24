import { defineEnvironmentVariables } from "./src/Configs/EnvironmentConfig";
import { TelegramBot } from "./src/Bot/Bot";
import { DatabaseConnection } from "./src/Database/DatabaseConnection";

defineEnvironmentVariables();

DatabaseConnection.Instance();
TelegramBot.Instance();