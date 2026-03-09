import { NextFunction, Request, Response } from "express"
import jwt, { decode, JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { pool } from "../config/db"
const auth =(...role: ('admin'|'customer')[])=>{
  console.log(role);
  
  return async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization
    // console.log(token);
    if(!token){
      throw new Error('unauthorized')
    }
    const decoded = jwt.verify(token,config.jwtSecret as string) as JwtPayload
    // console.log('ERROR',decoded);

    const user = await pool.query(`SELECT * FROM users WHERE email=$1`,[decoded.email])
    if(user.rows.length == 0){
      throw new Error("user not found")
    }
    req.user = decoded
    // res.user = decoded
  if(role.length && !role.includes(decoded.role)){
    res.status(401).json({
      success:false,
      message:'You are unauthorized'
    })
  }
    next()
    
  }
}

export default auth;