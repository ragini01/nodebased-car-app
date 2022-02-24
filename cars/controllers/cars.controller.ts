import express from 'express';
import carsService from '../services/cars.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:cars-controller');
class CarsController {
    async listCars(req: express.Request, res: express.Response) {
        const cars = await carsService.list();
        res.status(200).send(cars);
    }

    async getCarById(req: express.Request, res: express.Response) {
        const car = await carsService.readById(req.body.id);
        res.status(200).send(car);
    }

    async createCar(req: express.Request, res: express.Response) {
        const carId = await carsService.create(req.body);
        res.status(201).send({ id: carId });
    }

    async patch(req: express.Request, res: express.Response) {
        log(await carsService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        log(await carsService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeCar(req: express.Request, res: express.Response) {
        log(await carsService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new CarsController();
