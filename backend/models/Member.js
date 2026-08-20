import mongoose from 'mongoose'

// Store the details of one library member.
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: { type: String, required: true }
})

export default mongoose.model('Member', memberSchema)