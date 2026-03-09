import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
    res.status(200).json({
      success: true,
      message: "Fetched",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(req.user!.id );
    res.status(200).json({
      success: true,
      message: "user fetched",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    
    const result = await userService.updateUser(req.body, req.params.userId as string);
   if(result.rows.length ==0){
    res.status(404).json({
      success:false,
      message:'Vehicle not found'
    })
   }else{
     res.status(200).json({
      success: true,
      message: "Updated",
      data: result.rows[0],
    });
   }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.deleteUser(req.params.userId as string);
   if(result.rowCount == 0){
    res.status(404).json({
      success:false,
      message:'user not found'
    })
   }else{
     res.status(200).json({
      success: true,
      message: "deleted",
      data: result.rows[0],
    });
   }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
