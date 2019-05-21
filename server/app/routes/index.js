module.exports = function (app) {

  const todos = require('../controllers/todo.controller.js');
  const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(203).send({ message: '重新' });
  }
  //CRUD tareas

  app.get('/api/user', todos.create);

  app.post('/api/todos', todos.findAll);

  app.get('/api/todos/:todoId', todos.findOne);

  app.put('/api/todos/:todoId', todos.update);

  app.delete('/api/todos/:todoId', todos.delete);

  //user
  app.get('/api/user', todos.create);

  app.get('/list', isAuthenticated, function (req, res) {
    res.status(200).send({ success: true });
  });
};