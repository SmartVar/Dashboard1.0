import { Schema, model, models, Document } from 'mongoose';

export interface IPlot extends Document {
  division: string;
  name: string;
  district: string;
  location: string;
  local_body: string;
  area: string;
  moa: string;
  date_purchase: string;
  purchase_from: string;
  amount: string;
  purpose: string;
  lease_period: string;
  enchroached: string;
  enchroached_area: string;
  boundary_wall: string;
  po_constructed: string;
   mut_doc: string;
  mut_state: string;
  fund_type: string;
  fund_amount: string;
  cases: string;
  case_description: string;
  case_action: string;
  case_divisionaction: string;
  brief_history: string;
  corr_ro: string;
  corr_division: string;
   tags: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const PlotSchema = new Schema({
  
  division: { type: String, required: true },
    name: { type: String, required: true },
  district: { type: String, required: true },
  location: { type: String, required: true },
  local_body: { type: String },
  area: { type: String },
  moa: { type: String },
  date_purchase: { type: String },
  purchase_from: { type: String },
  amount: { type: String },
  purpose: { type: String },
  lease_period: { type: String },
  enchroached: { type: String },
  enchroached_area: { type: String },
  boundary_wall: { type: String },
  po_constructed: { type: String },
   mut_doc: { type: String },
      mut_state: { type: String },
      fund_type: { type: String },
      fund_amount: { type: String },
      cases: { type: String },
      case_description: { type: String },
      case_action: { type: String },
      case_divisionaction: { type: String },
      brief_history: { type: String },
      corr_ro: { type: String },
      corr_division: { type: String },
      tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Plot = models.Plot || model('Plot', PlotSchema);

export default Plot;