import CarsDao from '../daos/cars.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateCarDto } from '../dto/create.car.dto';
import { PutCarDto } from '../dto/put.car.dto';
import { PatchCarDto } from '../dto/patch.car.dto';
import carsDao from '../daos/cars.dao';

class CarsService implements CRUD {
    async create(resource: CreateCarDto) {
        return CarsDao.addCar(resource);
    }

    async deleteById(id: string) {
        return CarsDao.removeCarById(id);
    }

    async list() {
        return CarsDao.getCars();
    }

    async patchById(id: string, resource: PatchCarDto) {
        return CarsDao.updateCarById(id, resource);
    }

    async readById(id: string) {
        return CarsDao.getCarsById(id);
    }

    async putById(id: string, resource: PutCarDto) {
        return CarsDao.updateCarById(id, resource);
    }

}

export default new CarsService();
