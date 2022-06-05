const {Schema, model} = require('mongoose')

const book = new Schema({
    title: String,
    atribut: {
        type: Schema.Types.ObjectId,
        ref:'Atribut'
    },
    year: {
        type: Number,
        default: null
    },
    author: {
        type: String,
        default:''
    },
    nashr: {
        type: String,
        default:''
    },
    tarjimon: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        default:''
    },
    count: {
        type: Number,
        default: 1
    },
    order:Number,
    text:String,
    img: String,
    file: String,
    news:{
        type:Number,
        default:0
    },
    top:{
        type:Number,
        default:0
    },
    status:{
        type:Number,
        default:0
    },
    view: {
        type:Number,
        default:0
    },
    review:[
        {
            name:String,
            createdAt:{
                type:Date,
                default: Date.now()
            },
            mark:{
                type:Number,
                default:0
            },
            title:String,
            text:String,
            status: {
                type:Number,
                default:0
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }, 
})

module.exports = model('Book',book)
        // img:[String],