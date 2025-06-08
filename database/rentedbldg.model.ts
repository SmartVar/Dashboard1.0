import { Schema, model, models, Document } from 'mongoose';

export interface IRentedbldg extends Document {
  division: string;
  po: string;
  class_po: string;
  date_po_function: string;
  class_city: string;
  soa: string;
  area: string;
  paq: string;
  lease_period: string;
  rent: string;
  frac_status: string;
  frac_level: string;
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

const RentedbldgSchema = new Schema({
  
  division: { type: String, required: true },
  po: { type: String, required: true },
  class_po: { type: String, required: true},
  date_po_function: { type: String, required: true },
  class_city: { type: String},
  soa: { type: String},
  area: { type: String},
  paq: { type: String},
  lease_period: { type: String},
  rent: { type: String},
  frac_status: { type: String},
  frac_level: { type: String},
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

const Rentedbldg = models.Rentedbldg || model('Rentedbldg', RentedbldgSchema);

export default Rentedbldg;