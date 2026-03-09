import { pool } from "../../config/db"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

// export const secret ="";
const loginUserIntoDB =async(email:string,password:string)=>{
  const user = await pool.query(`SELECT * FROM users WHERE email =$1`,[email])

  if(user.rows.length == 0){
    throw new Error('User not found')
  }
  const matchPassword = await bcrypt.compare(password,user.rows[0].password)

  if(!matchPassword){
    throw new Error('invalid credentials')
  }
  const jwtPayload ={
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
    
  }
  
  const token =jwt.sign(jwtPayload,config.jwtSecret as string,{ expiresIn:"7d"})

  return {token,user: user.rows[0]}
}

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const hashPassword = await bcrypt.hash(password as string,12)
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, hashPassword, phone, role],
  );
  delete result.rows[0].password
  return result;
};
export const authService ={
  loginUserIntoDB,
  createUser
}