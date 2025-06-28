import { Schema, model, models, Document } from 'mongoose';

export interface IFund extends Document {
  fund_type: string;
  division: string;
  po: string;
  work: string;
  pe_amount: string;
  be_allot?: string;
  re_allot?: string;
  add_allot?: string;
  tot_allot: string;
  tender_amount?: string;
  progress?: string;
  balance?: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const FundSchema = new Schema<IFund>({
  fund_type: { type: String },
  division: { type: String },
  po: { type: String },
  work: { type: String },
  pe_amount: { type: String},
  be_allot: { type: String },
  re_allot: { type: String },
  add_allot: { type: String },
  tot_allot: { type: String},
  tender_amount: { type: String },
  progress: { type: String },
  balance: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Fund = models.Fund || model<IFund>('Fund', FundSchema);

export default Fund;
