import { Schema, model, models, Document } from 'mongoose';

export interface IDepartmentalbldg extends Document {
  division: string;
  po: string;
  class: string;
  location: string;
  purchase_year: string;
  soa: string;
  paq: string;
  area: string;
  builtup_area: string;
  open_space: string;
  floors: string;
  value: string;
  year: string;
  expenditure: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const DepartmentalbldgSchema = new Schema({
  
  division: { type: String, required: true },
  po: { type: String, required: true },
  class: { type: String, required: true},
  location: { type: String, required: true },
  purchase_year: { type: String},
  soa: { type: String},
  paq: { type: String},
  area: { type: String},
  builtup_area: { type: String},
  open_space: { type: String},
  floors: { type: String},
  year: { type: String},
  expenditure: { type: String},
  value: { type: String},
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Departmentalbldg = models.Departmentalbldg || model('Departmentalbldg', DepartmentalbldgSchema);

export default Departmentalbldg;