import mongoose from "mongoose"

const Schema = mongoose.Schema

const historySchema = new Schema({
  term:{
    type:String,
    required:true
  },
  when: {
    type: Date,
    default: Date.now()
  }
})

const History = mongoose.model('history',historySchema)

export default History