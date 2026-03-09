import { Router } from "express";
import { vehicleController } from "./vehicle.controller";

const router = Router();
router.get("/", vehicleController.getVehicle);
router.get("/:vehicleId", vehicleController.getSingleVehicle);
router.put('/:vehicleId',vehicleController.updateVehicle)
router.post('/',vehicleController.createVehicle)
router.delete('/:vehicleId',vehicleController.deleteVehicle)

export const vehicleRoute = router;
