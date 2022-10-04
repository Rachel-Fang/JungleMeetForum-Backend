const { Router } = require('express');
const auth = require('../middleware/auth');
const adminGuard = require('../middleware/adminGuard');
const {
  createPost,
  updatePost,
  getAllPosts,
  likePost,
  checkLike,
  getAllLikes,
  unlikePost,
  deletePost,
  getPostById,
  createMoviePost,
  patchPost,
} = require('../controllers/post');

const postRouter = Router();
postRouter.get('/', getAllPosts);
postRouter.get('/:id', getPostById);

// endpoints before this line is open to everyone
postRouter.use(auth);
// endpoints after this line require valid token to access

postRouter.patch('/:id', patchPost);
postRouter.post('/movie', createMoviePost);
postRouter.post('/', createPost);
postRouter.patch('/delete/:id', adminGuard, deletePost);
postRouter.put('/:id', updatePost);

postRouter.patch('/like/:id', auth, likePost);
postRouter.patch('/unlike/:id', auth, unlikePost);

postRouter.get('/:id/likes/', auth, getAllLikes);
postRouter.get('/:id/likes/:userId', auth, checkLike);

module.exports = postRouter;
