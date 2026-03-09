import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const getVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getVehicle();
    res.status(200).json({
      success: true,
      message: "Vehicles Fetched",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createVehicle(req.body);
    res.status(200).json({
      success: true,
      message: "Vehicle Created",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getSingleVehicle(
      req.params.vehicleId as string,
    );
    res.status(200).json({
      success: true,
      message: "Vehicle fetched",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.updateVehicle(
      req.body,
      req.params.vehicleId as string,
    );
     if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User successfully updated",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteVehicle = async(req: Request, res: Response)=>{
  try {
    const result = await vehicleService.deleteVehicle(req.params.vehicleId as string);
    if (result.rowCount == 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}
export const vehicleController = {
  getSingleVehicle,
  getVehicle,
  updateVehicle,
  createVehicle,
  deleteVehicle
};
