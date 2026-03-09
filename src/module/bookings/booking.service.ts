import { pool } from "../../config/db";

const createBooking = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, password, phone, role],
  );
  return result;
};
const getBooking = async()=>{
  const result = await pool.query('SELECT * FROM bookings')
  return result
}

const updateBooking = async(payload:Record<string,unknown>)=>{
  const{}= payload
  const result = await pool.query(`UPDATE bookings SET `)
}



export const bookingService = { createBooking };
