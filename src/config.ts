import * as dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_FILE });

export const config = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
};
