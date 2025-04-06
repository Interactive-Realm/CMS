import dotenv from 'dotenv';
import { app } from './index';
import config from './config/config';

import http from 'http';

dotenv.config();

const CORE_PORT = config.CORE_PORT;
const server = http.createServer(app);

if (process.env.NODE_ENV === 'test') {
  server.listen(CORE_PORT, () => {
    console.log('🧪 Test server running on port', CORE_PORT);
  });
};

export default server;