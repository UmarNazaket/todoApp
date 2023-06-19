import mongoose from 'mongoose';
require('dotenv').config();
import '../models/User'; 
import '../models/Task'; 

const MONGODB_URI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.xazjotc.mongodb.net/`;
mongoose
  .connect(MONGODB_URI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

export default mongoose;