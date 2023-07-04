const CommentsController = require('../controllers/comments.controller');
const authenticate = require('../middlewares/authenticate');

module.exports = (app) => {
  app.post('/api/comments', CommentsController.createComment);
  app.get('/api/comments', CommentsController.getComments);
  app.get('/api/comments/:id', CommentsController.getComment);
  app.put('/api/comments/:id', CommentsController.updateComment);
  app.delete('/api/comments/:id', CommentsController.deleteComment);
};
