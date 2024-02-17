import { Schema, model, models, Document } from 'mongoose';

export interface ITask extends Document {
  // id: string;
  title: string;
  doc: string;
  division: string;
  c_no: string;
  f_no: string;
  dod: string;
  status: string;
  label: string;
  priority: string;
  remark: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const TaskSchema = new Schema({
  
  // id: { type: String, required: true },
  title: { type: String, required: true },
  doc: { type: String },
  division: { type: String, required: true},
  c_no: { type: String, required: true },
  f_no: { type: String },
  dod: { type: String },
  status: { type: String, required: true },
  label: { type: String, required: true},
  priority: { type: String, required: true },
  remark: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;