import { Schema, model, models, Document } from 'mongoose';

export interface IEvent extends Document {
  division: string;
  title: string;
  description: string;
  section: string;
  event_date: string;
  ro_corr: string;
  division_corr: string;
  status: string;
  reminders: string;
  tot_reminder: string;

  createdOn: Date;
}

const EventSchema = new Schema({
  
  division: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  section: { type: String, required: true },
  event_date: { type: String, required: true },
  ro_corr: { type: String, required: true },
  division_corr: { type: String, required: true },
  status: { type: String, required: true },
  reminders: { type: String, required: true },
  tot_reminder: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;