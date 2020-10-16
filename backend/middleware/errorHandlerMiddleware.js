export const notFound = (req,res,next)=>{
    res.status(404);
    const error = new Error(`Not Found ${req.originalUrl}`);
    next(error);
}

export const errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);

    const stack = process.env.NODE_ENV === 'production' ? null : err.stack;

    res.json({message: err.message, stack:stack});
}