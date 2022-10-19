const { Schema, model } = require('mongoose');
const User = require('./User');
const reactionSchema = require('./Reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (currentDate) => moment(currentDate).format('MMMM Do YYYY, h:mm:ss a'),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],

    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
.get(function(){
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;