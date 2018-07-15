import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});



var Todo = mongoose.model('Todo', TodoSchema);


export default Todo;
