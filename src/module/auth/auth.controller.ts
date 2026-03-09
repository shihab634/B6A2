import { Request, Response } from "express";
import { authService } from "./auth.service";


const loginUser = async (req: Request, res: Response) => {
  try {
    const {email,password} = req.body
    const result = await authService.loginUserIntoDB(email,password) ;
    res.status(200).json({
      success: true,
      message: "Login successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.createUser(req.body);
    res.status(200).json({
      success: true,
      message: "created",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};
export const authController ={
loginUser,
createUser
}