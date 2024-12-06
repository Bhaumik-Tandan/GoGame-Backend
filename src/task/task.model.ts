import { Schema, Document } from 'mongoose';

export interface Task extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
  user: string;  // Assuming user is a string, you might reference another model
}

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Assuming users are another model
}, {
  timestamps: true,
});
