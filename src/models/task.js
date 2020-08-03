const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        validate(value){
            if(value === null){
                throw new Error('Please provide a value')
            }
        }
    },
    completed: {
        type: Boolean,
        default: false,
        validate(value){
            if(value === null){
                throw new Error('Please provide a value')
            }
        }
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task