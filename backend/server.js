import path from 'path';
import express from 'express';
import {notFound, errorHandler} from './middleware/errorHandlerMiddleware.js';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDB from './config/db.js';

import ProductRouter from './routes/ProductRoute.js';
import UserRouter from './routes/UserRoute.js';
import OrderRouter from './routes/OrderRoute.js';
import UploadRouter from './routes/UploadRoute.js';

const app = express();

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'));
}


dotenv.config();

connectDB();

app.use(express.json());



app.use('/api/products',ProductRouter);
app.use('/api/users',UserRouter);
app.use('/api/orders',OrderRouter);
app.use('/api/upload',UploadRouter);

app.get('/api/config/paypal',(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname,'/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*', (req,res)=>res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}else{
    app.get('/',(req,res)=>{
        res.send('API is running')
    })
}

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`.bgCyan.black));