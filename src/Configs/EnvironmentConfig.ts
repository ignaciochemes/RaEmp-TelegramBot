import * as Dotenv from 'dotenv';
import * as path from 'path';
import { EnvironmentConstants } from '../Constants/EnvironmentConstants';

let envData;

export const defineEnvironmentVariables = () => {
    console.log(`---> ` + process.env.RET_ENV);
    switch (process.env.RET_ENV) {
        case EnvironmentConstants.LOCAL:
            envData = Dotenv.config({path: path.resolve(__dirname, '../../../.env.local') }).parsed;
            break;
        case EnvironmentConstants.PRODUCTION:
            envData = Dotenv.config({path: path.resolve(__dirname, '../../../.env') }).parsed;
            break;
        default:
            envData = Dotenv.config().parsed;
    }
    return envData;
}