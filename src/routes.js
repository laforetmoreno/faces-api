const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer');

const postsControllers = require('./controllers/posts');

routes.post('/posts', multer(multerConfig)
  .single('file'), postsControllers.create)

routes.get('/posts', postsControllers.retrieveAll);

routes.delete('/posts/:id', postsControllers.deleteById)

module.exports = routes;