
/*
  This is a function that is called at the end of the request
  if the error was encountered during the request processing 
*/

import { NextFunction,Response,Request } from "express";

const errorHandler=(err:any, req:Request, res:Response, next:NextFunction)=>{
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).json({
    "msg":"Internal Server Error"
  })
};
export default errorHandler;