import dotenv from 'dotenv';
import { app } from './index';
import config from './config/config';

import http from 'http';

dotenv.config();

const RAFFLE_PORT = config.RAFFLE_PORT;
const server = http.createServer(app);

if (process.env.NODE_ENV === 'test') {
  server.listen(RAFFLE_PORT, () => {
    console.log('🧪 Test server running on port', RAFFLE_PORT);
  });
};

export default server;