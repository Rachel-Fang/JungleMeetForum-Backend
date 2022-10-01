const { StatusCodes } = require('http-status-codes');
const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  const { text, author, postId } = req.body;
  try {
    const comment = new Comment({ text, author, postId });
    const ret = await comment.save();

    return res.status(StatusCodes.OK).json(ret);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    return res.status(StatusCodes.OK).json(comments);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const getCommentById = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    return res.status(StatusCodes.OK).json(comment);
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;
  const { visible } = req.body;

  try {
    await Comment.findByIdAndUpdate({ _id: id }, [{ $set: { visible: { $toBool: visible } } }], {
      runValidator: true,
      useFindAndModify: true,
      new: true,
    });
    return res.status(StatusCodes.OK).json('Your comment has already been deleted!');
  } catch (err) {
    return res.status(StatusCodes.NOT_FOUND).json(err);
  }
};
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { text, mentionUserId } = req.body;
  try {
    const comment = Comment.findById(id);
    await comment.updateOne({ $set: { text, mentionUserId } }, { runValidator: true, new: true });
    return res.status(StatusCodes.OK).json('updated');
  } catch (err) {
    return res.status(StatusCodes.err).json(err);
  }
};

const toggleLikeOnComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req;
  const comment = await Comment.findById(commentId).exec();
  if (!comment) return res.status(StatusCodes.NOT_FOUND);
  // the types are not correct, one is object id the other is string, but it works in mongoose
  if (comment.like.includes(userId)) {
    comment.like.pull(userId);
  } else {
    comment.like.push(userId);
  }
  await comment.save();
  return res.status(StatusCodes.OK).json({ like: comment.like });
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  deleteCommentById,
  updateComment,
  toggleLikeOnComment,
};
