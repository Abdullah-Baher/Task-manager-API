const mongoose = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value === null){
                throw new Error('Please provide a value')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value){

            if(!validator.default.isEmail(value))
            {
                throw new Error('InCorrect Email!')
            }
            if(value === null){
                throw new Error('Please provide a value')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){

            if(value.toLowerCase() === 'password')
            {
                throw new Error('InCorrect Password!')
            }

            if(value === null)
            {
                throw new Error('Please provide a value')
            }
        }
    },
    age: {
        type: Number,
        min: 0,
        default: 0,
        validate(value){
            if(value === null){
                throw new Error('Please provide a value')
            }
        }
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            }
        }
    ],
    avatar: {
        type: Buffer
    }
},{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const toSendObj = user.toObject()

    delete toSendObj.password
    delete toSendObj.tokens
    delete toSendObj.avatar
    return toSendObj
}

userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET_KEY)

    user.tokens.push({ token })

    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to login!')
    }
    
    const isMatch = await bcrypt.compare(password,user.password)
    
    if(!isMatch)
    {   
        throw new Error('Unable to login')
    }

    return user
}

userSchema.pre('save', async function (next) {
    
    const user = this

    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()

})

userSchema.pre('remove', async function (next) {
    
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User