import { Schema, model, models, Document } from 'mongoose';

export interface ITicket extends Document {
    division: string;
  po: string;
  tkttitle: string;
  tktdescription: string;
  tktstatus: string;
  tktpriority: string;
  author: Schema.Types.ObjectId;
  createdOn: Date;
}

const TicketSchema = new Schema({
  
  division: { type: String, required: true },
    po: { type: String, required: true },
    tkttitle: { type: String, required: true },
    tktdescription: { type: String, required: true },
    tktstatus: { type: String, required: true },
    tktpriority: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
});

const Ticket = models.Ticket || model('Ticket', TicketSchema);

export default Ticket;