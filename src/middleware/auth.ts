import { NextFunction, Request, Response } from "express"
import jwt, {  JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { pool } from "../config/db"
const auth =(...role: ('admin'|'customer')[])=>{
  console.log(role);
  
  return async(req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers.authorization?.split(' ')[1]
    console.log(token);
    if(!token){
      return res.status(401).json({
      success:false,
      message:'You are unauthorized'
    })
    }
    const decoded = jwt.verify(token as string,config.jwtSecret as string) as JwtPayload
 

    const user = await pool.query(`SELECT * FROM users WHERE email=$1`,[decoded.email])
    if(user.rows.length == 0){
      return res.status(404).json({
      success:false,
      message:'User not found'
    })
    }
    req.user = decoded
    // res.user = decoded
  if(role.length && !role.includes(decoded.role)){
    return res.status(401).json({
      success:false,
      message:'You are unauthorized'
    })
  }
    next()
    
  }
}

export default auth;