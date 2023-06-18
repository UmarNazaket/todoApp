import mongoose from 'mongoose';
import '../models/User'; 
import '../models/Task'; 

const MONGODB_URI = `mongodb+srv://root:root@cluster0.72kd1jm.mongodb.net/`;

mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

export default mongoose;