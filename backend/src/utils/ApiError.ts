class ApiError extends Error{
    statusCode: number;
    data:any = null;
    success:boolean = false;
    errors:[] = [];
    constructor(statusCode:number,message:string="Something went wrong",errors:[]=[],stack?:string){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        this.data = null;

        Object.setPrototypeOf(this,ApiError.prototype)

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}