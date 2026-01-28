const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: [100, 'Task Title Cannot Exceed 100 Characters']
  },
  description: {
    type: String,
    maxlength: [3000, 'Description cannot exceed 3000 characters. Sorry!']
  },
  status: {
    type: String,
    enum: ["Why Haven't You Started On This?", "Started.. But Haven't Finished", "DONE!"],
    default: "Why Haven't You Started On This?"
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  }
});

module.exports = mongoose.model('Task', taskSchema);
