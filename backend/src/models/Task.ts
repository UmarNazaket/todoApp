import mongoose, { Document, Schema } from 'mongoose';
import { User } from './User';

export interface Task extends Document {
  title: string;
  description: string;
  priority: string;
  dueDate: Date;
  status: string;
  user: User['_id']; 
}

const taskSchema = new Schema<Task>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model<Task>('Task', taskSchema);
