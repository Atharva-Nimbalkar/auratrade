const notFound=
(req,res,next)=>{
    const error=new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

/*  In the context of Express.js middleware functions, `req` represents the request object, `res` represents the response object,
and `next` is a callback function that is used to pass control to the next middleware function in the stack. This syntax is commonly used in Express.js middleware
functions to handle incoming requests and responses. */

const errorHandler=(err,req,res,next)=>{
    let statusCode=res.statusCode===200?500 : res.statusCode;
    let message=err.message;

    //check for Mongoose bad ObjectId CastError
    if(err.name==='CastError' && err.kind==='ObjectId'){
        message='Resource not found';
        statusCode=404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' :err.stack,
    });
};

export {notFound,errorHandler};

