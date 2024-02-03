import { Schema, model, models, Document } from 'mongoose';

export interface IPendency extends Document {
  dak_no: string;
  doc: string;
  division: string;
  c_no: string;
  subject: string;
  f_no: string;
  dos: string;
  dor: string;
  remarks: string;
  status: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const PendencySchema = new Schema({
  
  dak_no: { type: String, required: true },
  doc: { type: String, required: true },
  division: { type: String, required: true},
  c_no: { type: String, required: true },
  subject: { type: String, required: true },
  f_no: { type: String },
  dos: { type: String },
  dor: { type: String },
  remarks: { type: String },
  status: { type: String},
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Pendency = models.Pendency || model('Pendency', PendencySchema);

export default Pendency;