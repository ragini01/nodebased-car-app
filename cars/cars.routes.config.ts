import {CommonRoutesConfig} from '../common/common.routes.config';
import CarsController from './controllers/cars.controller';
import CarsMiddleware from './middleware/cars.middleware';
import express from 'express';

export class CarsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'CarsRoutes');
    }

    configureRoutes(){

        this.app.route(`/cars`)
            .get(CarsController.listCars)
            .post(CarsController.createCar
            );

        this.app.param(`carId`, CarsMiddleware.extractCarId);
        this.app.route(`/cars/:carId`)
            .all(CarsMiddleware.validateCarExists)
            .get(CarsController.getCarById)
            .delete(CarsController.removeCar);
        this.app.put(`/cars/:carId`, [
            CarsController.put,
            ]);
    
        this.app.patch(`/cars/:carId`, [          
            CarsController.patch,
            ]);
    
        return this.app;
    }
}