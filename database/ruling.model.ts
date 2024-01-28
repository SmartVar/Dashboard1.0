import { Schema, model, models, Document } from 'mongoose';

export interface IRuling extends Document {
  title: string;
  category: string;
  subcategory: string;
  link: string;
  section: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const RulingSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true},
  link: { type: String, required: true },
  section: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Ruling = models.Ruling || model('Ruling', RulingSchema);

export default Ruling;