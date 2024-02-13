import { Schema, model, models, Document } from 'mongoose';

export interface ITask extends Document {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const TaskSchema = new Schema({
  
  id: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  label: { type: String, required: true},
  priority: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Task = models.Task || model('Task', TaskSchema);

export default Task;