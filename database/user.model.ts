import { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  picture: string;
  role?: string;
  section?: string;
  reputation?: number;
  templates: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String, required: true },
  role: { type: String, default: 'users' },
  reputation: { type: Number, default: 0 },
  section: { type: String, },
  templates: [{ type: Schema.Types.ObjectId, ref: 'Template' }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model('User', UserSchema);

export default User;