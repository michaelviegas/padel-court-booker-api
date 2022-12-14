import express from 'express';
import bodyparser from 'body-parser';

import cors from 'cors';

import alsakia from './controllers/alsakiaController.js';

const server = express();

server.use(bodyparser.json());
server.use(cors());

server.get('/relax', alsakia.relax);
server.get('/marisco', alsakia.marisco);
server.get('/hello', (req, res) => { res.status(200).end("Ah, ah, ah, ah, stayin' alive, stayin' alive"); });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));