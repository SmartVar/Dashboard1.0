// Import necessary modules
import mongoose, { Schema, Document } from 'mongoose';

// Define the Card schema
export interface ICard extends Document {
  title: string;
  labels: string[];
  date: string;
  tasks: string[];
}

const cardSchema: Schema = new Schema({
  title: { type: String, required: true },
  labels: [{ type: String }],
  date: { type: String },
  tasks: [{ type: String }],
});

// Define the Board schema
export interface IBoard extends Document {
  title: string;
  cards: ICard[];
}

const boardSchema: Schema = new Schema({
  title: { type: String, required: true },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

// Create models
export const CardModel = mongoose.model<ICard>('Card', cardSchema);
export const BoardModel = mongoose.model<IBoard>('Board', boardSchema);
