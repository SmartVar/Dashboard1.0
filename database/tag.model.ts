import { Schema, model, models, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  description: string;
  departmentalbldgs: Schema.Types.ObjectId[];
  rentedbldgs: Schema.Types.ObjectId[];
  // followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  departmentalbldgs: [{ type: Schema.Types.ObjectId, ref: 'Departmentalbldg' }], 
  rentedlbldgs: [{ type: Schema.Types.ObjectId, ref: 'Rentedbldg' }], 
  // followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model('Tag', TagSchema);

export default Tag;