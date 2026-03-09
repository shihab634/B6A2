// import { pool } from "../../config/db";
import bcrypt from 'bcryptjs'
import { pool } from "../../config/db";

const getUser = async () => {
  const result = await pool.query("SELECT id,name,email,phone,role FROM users");
  //  result.rows.forEach(user=>{
  //   delete user.password
  //  })
  return result;
};



const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUser = async (payload:Record<string,unknown>, id: string) => {
  const {name,email,phone,role,password}= payload
  const result = await pool.query(
    `UPDATE users SET name =$1, email=$2, phone=$3,role=$4, password=$5 WHERE id=$6 RETURNING *`,
    [name, email,phone,role,password,id],
  );
  return result;
};

const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id =$1`, [id]);
  return result;
};

export const userService = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
