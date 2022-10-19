const { ObjectId } = require("mongoose").Types;
const { User, Thought, Reaction } = require("../models");

// post to create new thought (push created thoughts id to associated user's thoughts array)

// put to update a thought by its id
// delete to remove a thought by its id

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
        console.log(thought);
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
};

// const { Course, Student } = require('../models');

// module.exports = {
//   // Get all courses
//   getCourses(req, res) {
//     Course.find()
//       .then((courses) => res.json(courses))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Get a course
//   getSingleCourse(req, res) {
//     Course.findOne({ _id: req.params.courseId })
//       .select('-__v')
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a course
//   createCourse(req, res) {
//     Course.create(req.body)
//       .then((course) => res.json(course))
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Delete a course
//   deleteCourse(req, res) {
//     Course.findOneAndDelete({ _id: req.params.courseId })
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : Student.deleteMany({ _id: { $in: course.students } })
//       )
//       .then(() => res.json({ message: 'Course and students deleted!' }))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Update a course
//   updateCourse(req, res) {
//     Course.findOneAndUpdate(
//       { _id: req.params.courseId },
//       { $set: req.body },
//       { runValidators: true, new: true }
//     )
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with this id!' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };
