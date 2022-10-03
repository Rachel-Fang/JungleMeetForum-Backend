const { Router } = require('express');
const auth = require('../middleware/auth');
const adminGuard = require('../middleware/adminGuard');

const {
  createComment,
  getAllComments,
  getCommentById,
  deleteCommentById,
  updateComment,
} = require('../controllers/comment');

const commentRouter = Router();

commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getCommentById);

// endpoints before this line is open to everyone
commentRouter.use(auth);
// endpoints after this line require valid token to access

commentRouter.post('/', createComment);
commentRouter.put('/:id', updateComment);
// Wd don't delete comment but update "visible" value to false and then the comment won't show anymore.
// only admin can delete a comment
commentRouter.put('/delete/:id', adminGuard, deleteCommentById);

module.exports = commentRouter;
