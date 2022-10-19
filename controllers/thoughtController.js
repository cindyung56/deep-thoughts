const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

// post to create reaction
// delete reaction

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // get a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(async (thought) => {
        !thought
          ? res.status(400).json({ message: "No thought with that ID" })
          : res.json({ thought });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create new thought (add the thought id to the user's thoughts array)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate(
          { username: thought.username },
          {
            $addToSet: {
              thoughts: thought._id,
            },
          },
          { new: true }
        ).then(() => res.status(200).json(thought));
      })
      .catch((err) => res.status(500).json(err));
  },

  // update thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
    })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // delete thought by id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.status(200).json(thought)
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // post to create reaction
  createReaction(req,res){
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No thought found with that ID" })
            : res.status(200).json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  },
  
  // delete reaction
  deleteReaction(req,res){
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId: req.body.reactionId} } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: "No user found with that ID" })
            : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
  }
};
