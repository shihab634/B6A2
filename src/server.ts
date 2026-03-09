import express, { Request, Response } from "express";
import initDB, { pool } from "./config/db";
import config from "./config";
import { userRoute } from "./module/users/user.route";
import { vehicleRoute } from "./module/vehicles/vehicle.route";
import { bookingRoute } from "./module/bookings/booking.route";
import { authRouter } from "./module/auth/auth.route";
const app = express();
app.use(express.json());
// const port = 5000

initDB();

// app.use("/users");

app.use("/api/v1/users", userRoute);

// vehicle crud
app.use('/api/v1/vehicles',vehicleRoute)

// booking crud

app.use('/api/v1/bookings',bookingRoute)
// login 

app.use('/api/v1/auth',authRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
    path: req.path,
  });
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
