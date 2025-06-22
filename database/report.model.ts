import { Schema, model, models, Document } from 'mongoose';

export interface IReport extends Document {
  title: string;
  nmd: string;
  thn: string;
  nsk: string;
  rgd: string;
  mld: string;
  pld: string;
  psd: string;
  csd: string;
  rtc: string;
  c_sion: string;
  c_pune: string;
  e_sion: string;
  remark: string;
  status: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const ReportSchema = new Schema({
  
  title: { type: String},
  nmd: { type: String},
  thn: { type: String},
  nsk: { type: String},
  rgd: { type: String},
  mld: { type: String},
  pld: { type: String},
  psd: { type: String},
  csd: { type: String},
  rtc: { type: String},
  c_sion: { type: String},
  c_pune: { type: String},
  e_sion: { type: String},
  remark: { type: String},
  status: { type: String},
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Report = models.Report || model('Report', ReportSchema);

export default Report;