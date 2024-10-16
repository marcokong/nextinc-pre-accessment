const express = require('express');
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = 'debug';

const app = express();
app.use(express.json());


// Mock data
let resources = [
    { id: 1, name: 'Resource 1' },
    { id: 2, name: 'Resource 2' },
    { id: 3, name: 'Resource 3' },
    { id: 4, name: 'Resource 4' },
    { id: 5, name: 'Resource 5' },
];

app.post('/api/v1/resources', (req, res) => {
    const resource = req.body;

    if (!resource.name) {
        logger.warn('Resource name is required');
        return res.status(400).send('Cannot create resource: Resouce name is required');
    } else if (resources.find(r => r.name === resource.name)) {
        logger.warn('Resource name already exists');
        return res.status(409).send(`Cannot create resource: ${resource.name} already exists`);
    }

    const id = Math.max(...resources.map(r => r.id)) + 1;
    resources.push({id, name: resource.name});
    logger.info(`Resource ${resource.name} created with id ${id}`);
    res.status(201).json(resource);
});

app.get('/api/v1/resources', (req, res) => {
    res.json(resources);
});

app.get('/api/v1/resources/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const resource = resources.find(r => r.id === id);
    if (resource) {
        logger.info(`Get resource with id ${id}`);
        res.json(resource);
    } else {
        logger.warn(`Resource with id ${id} not found`);
        res.status(404).send(`Resource with id ${id} not found`);
    }
});

app.put('/api/v1/resources/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const resource = req.body;
    const index = resources.findIndex(r => r.id === id);
    if (index !== -1) {
        resources[index] = resource;
        logger.info(`Resource with id ${id} updated`);
        res.json(resource);
    } else {
        logger.warn(`Cannot update resource: resource with id ${id} not found`);
        res.status(404).send(`Cannot update resource: resource with id ${id} not found`);
    }
});

app.delete('/api/v1/resources/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = resources.findIndex(r => r.id === id);
    if (index !== -1) {
        resources.splice(index, 1);
        logger.info(`Resource with id ${id} deleted`);
        res.sendStatus(204);
    } else {
        logger.warn(`Cannot delete resource: resource with id ${id} not found`);
        res.status(404).send(`Cannot delete resource: resource with id ${id} not found`);
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
});