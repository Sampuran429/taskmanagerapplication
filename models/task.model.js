const mongoose=require('mongoose');

const taskSchema= new mongoose.Schema(
    {
        title : {
            type: String,
            required: [true, 'Title is required'],
        },
        description : {
            type: String,
        },
        status : {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
        },
        createdAt : {
            type: Date,
            default: Date.now,
        },
        userId :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {timestamps: true}
);

module.exports= mongoose.model('Task', taskSchema);