import express from 'express';
import carsService from '../services/cars.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:cars-controller');
class CarsMiddleware {
    async validateCarExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const car = await carsService.readById(req.params.carId);
        if (car) {
            next();
        } else {
            res.status(404).send({
                error: `Car ${req.params.carId} not found`,
            });
        }
    }

        async extractCarId(
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) {
            req.body.id = req.params.carId;
            next();
        }
    

}

export default new CarsMiddleware();