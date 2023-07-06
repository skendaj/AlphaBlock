const Comment = require('../models/comment.model');
const User = require('../models/user.model');

module.exports.createComment = (req, res) => {
  const { userId, text } = req.body;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const comment = new Comment({
        user: user._id,
        text: text,
      });

      return comment.save();
    })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error creating comment', error: err });
    });
};

module.exports.getComments = (req, res) => {
  Comment.find()
    .populate('user', 'firstName lastName photo')
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error retrieving comments', error: err });
    });
};

module.exports.getComment = (req, res) => {
  const { id } = req.params;

  Comment.findById(id)
    .populate('user', 'firstName lastName photo') // Populate the 'user' field with specific fields of the User model
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error retrieving comment', error: err });
    });
};

module.exports.updateComment = (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  Comment.findByIdAndUpdate(
    id,
    { text },
    { new: true }
  )
    .populate('user', 'firstName lastName photo') // Populate the 'user' field with specific fields of the User model
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error updating comment', error: err });
    });
};

module.exports.deleteComment = (req, res) => {
  const { id } = req.params;

  Comment.findByIdAndDelete(id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }

      res.json({ message: 'Comment deleted successfully' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error deleting comment', error: err });
    });
};
w