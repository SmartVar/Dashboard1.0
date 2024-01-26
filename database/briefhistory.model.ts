import { Schema, model, models, Document } from 'mongoose';

export interface IBriefhistory extends Document {
  title: string;
  category: string;
  description: string;
  section: string;
  allusers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const BriefhistorySchema = new Schema({
  title: { type: String, required: true, unique: true },
  category: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  section: { type: String, required: true, unique: true },
  allusers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
  createdOn: { type: Date, default: Date.now },
});

const Briefhistory = models.Briefhistory || model('Briefhistory', BriefhistorySchema);

export default Briefhistory;