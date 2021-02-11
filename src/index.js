const express = require('express');

const app = express();

app.use(express.json());

//Busca informacoes no backend
app.get('/projects', (request, response) => { 
  const query = request.query;

  console.log(query);

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3'
  ]);
});

//adiciona informacoes no backend
app.post('/projects', (request, response) => {
  const body = request.body;

  console.log(body);

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
    'Projeto 4'
  ]);
});

//altera informacoes no backend
app.put('/projects/:id', (request, response) => {
  const params = request.params;

  console.log(params);

  return response.json([
    'Projeto 4',
    'Projeto 3',
    'Projeto 2',
    'Projeto 1'
  ]);
});

//deleta informacoes no backend
app.delete('/projects/:id', (request, response) => {
  return response.json([
    'Projeto 4',
    'Projeto 3',
  ]);
})

app.listen(3333, () => {
  console.log("🚀 backend started!");
}); 