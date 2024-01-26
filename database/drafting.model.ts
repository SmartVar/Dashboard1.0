import { Schema, model, models, Document } from 'mongoose';

export interface IDrafting extends Document {
  title: string;
  category: string;
  description: string;
  section: string;
  allusers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const DraftingSchema = new Schema({
  title: { type: String, required: true, unique: true },
  category: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  section: { type: String, required: true, unique: true },
  allusers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  createdOn: { type: Date, default: Date.now },
});

const Drafting = models.Noting || model('Drafting', DraftingSchema);

export default Drafting;