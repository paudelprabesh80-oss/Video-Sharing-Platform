class Apihandler extends Error 
{

constructor(
  statuscode,
   message = "Something went wrong",
    errors = [],
    stack = "",
    data = null

)
{
    super(message);
    this.statuscode = statuscode;
    this.data = data;
    this.message = message;
    this.success = false;
    this.errors = errors;
  
    if (stack) {
        this.stack = stack;

    } else {
         Error.captureStackTrace(this, this.constructor);
    }
    //the javascript will trace where did the error occur in the code
}
}
export { Apihandler };