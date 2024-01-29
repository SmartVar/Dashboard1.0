import { Schema, model, models, Document } from 'mongoose';

export interface IPendency extends Document {
  title: string;
  category: string;
  subcategory: string;
  description: string;
  section: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const PendencySchema = new Schema({
  
  title: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true},
  description: { type: String, required: true },
  section: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Pendency = models.Pendency || model('Pendency', PendencySchema);

export default Pendency;