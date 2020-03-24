const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const connection = require('./database/connection');

const routes = express.Router();

routes.post('/sessions', SessionController.create); // realizando login

routes.get('/ongs', OngController.index); // listagem de ongs
routes.post('/ongs', OngController.create); // cadastro de ongs

routes.get('/profile', ProfileController.index); // listando casos especificos da ong

routes.get('/incidents', IncidentController.index); // listagem de casos
routes.post('/incidents', IncidentController.create); // cadastro de casos
routes.delete('/incidents/:id', IncidentController.delete); // apagar casos

module.exports = routes; // exportando rotas com nodejs