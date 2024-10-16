const Websocket = require('ws');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const wss = new Websocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    logger.info('New Client connected');
    ws.send('Welcome to the server!');

    ws.on('message', (message) => {
        logger.info(`Received message: ${message}`);
        ws.send(`Message received: ${message}`);
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === Websocket.OPEN) {
                client.send(`Broadcast: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        logger.info('Client disconnected');
    });

    ws.on('error', (error) => {
        logger.error(`Error: ${error}`);
    });
});

logger.info('Server started on port 8080');