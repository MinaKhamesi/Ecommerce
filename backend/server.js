import express from 'express';
import {notFound, errorHandler} from './middleware/errorHandlerMiddleware.js';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

import ProductRouter from './routes/ProductRoute.js';
import UserRouter from './routes/UserRoute.js';
import OrderRouter from './routes/OrderRoute.js';

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running')
})

app.use('/api/products',ProductRouter);
app.use('/api/users',UserRouter);
app.use('/api/orders',OrderRouter);

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID));


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`.bgCyan.black));