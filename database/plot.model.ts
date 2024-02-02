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
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Plot = models.Plot || model('Plot', PlotSchema);

export default Plot;