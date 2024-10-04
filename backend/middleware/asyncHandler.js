/**
 * The asyncHandler function is a higher-order function that wraps an asynchronous function and handles
 * any errors that may occur during its execution.
 * @param fn - The `fn` parameter in the `asyncHandler` function is a function that represents the
 * asynchronous operation that needs to be handled. This function takes `req`, `res`, and `next` as
 * parameters, where `req` is the request object, `res` is the response object, and // `next` is the
 * next middleware function in the stack.     
 */
const asyncHandler=(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
};

export default asyncHandler;