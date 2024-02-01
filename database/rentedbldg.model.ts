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
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Rentedbldg = models.Rentedbldg || model('Rentedbldg', RentedbldgSchema);

export default Rentedbldg;