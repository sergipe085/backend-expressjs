const express = require('express');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

function logRequest(request, responde, next) {
  const method = request.method;
  const url = request.url;

  const logLabel = `[${method}] ${url}`;
  console.log(logLabel);

  return next(); //Próximo middleware
}

app.use(logRequest);

//Busca informacoes no backend
app.get('/projects', (request, response) => { 
  const query = request.query;

  const results = query.title ? projects.filter((project) => project.title.includes(query.title)) : projects;

  return response.json(results);
});

//adiciona informacoes no backend
app.post('/projects', (request, response) => {
  const body = request.body;

  const project = { id: uuid(), title: body.title, owner: body.owner };
  projects.push(project);

  return response.json(project);
});

//altera informacoes no backend (atualiza)
app.put('/projects/:id', (request, response) => {
  const params = request.params; //route params
  const body = request.body;

  const projectIndex = projects.findIndex((project) => project.id === params.id);

  if (projectIndex < 0) {
    return response.status(400).json({ "error": "No Project Found." });
  }

  const project = { id: params.id, title: body.title, owner: body.owner };
  projects[projectIndex] = project;

  return response.json(project);
});

//deleta informacoes no backend
app.delete('/projects/:id', (request, response) => {
  const params = request.params;

  const projectIndex = projects.findIndex((project) => project.id === params.id);

  if (projectIndex < 0) {
    return response.status(400).json({ "error": "No Project Found." });
  }

  projects.splice(projectIndex, 1); //remover item do array

  return response.status(204).send();
})

app.listen(3333, () => {
  console.log("🚀 backend started!");
}); 