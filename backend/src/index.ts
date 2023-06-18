import express, { Express, Request, Response, NextFunction } from 'express';
import routes from '../src/routes/index';
import connection from "./config/connection";
import cors from 'cors';

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  );
  

app.use((req: Request, res: Response, next: NextFunction) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});

app.use('/', routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
    status: 404
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
console.log('Registered models:', connection.models);
