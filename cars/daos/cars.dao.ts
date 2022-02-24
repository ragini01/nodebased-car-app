import { CreateCarDto } from '../dto/create.car.dto';
import { PatchCarDto } from '../dto/patch.car.dto';
import { PutCarDto } from '../dto/put.car.dto';
import mongooseService from '../../common/services/mongoose.service';
import debug from 'debug';
import shortid from 'shortid';

const log: debug.IDebugger = debug('app:in-memory-dao');

class CarsDao {
    
    Schema = mongooseService.getMongoose().Schema;

    carSchema = new this.Schema({
        _id: String,
        id: String,
        model: String,
        maker: String,
        price: Number,
        colour: String,
    }, { id: false });
    
    Car = mongooseService.getMongoose().model('Cars', this.carSchema);
    constructor() {
        log('Created new instance of CarsDao');
    }

    async addCar(carFields: CreateCarDto) {
        const carId = shortid.generate();
        const car = new this.Car({
            _id: carId,
            ...carFields,
        });
        await car.save();
        return carId;
    }
    
    async getCarsById(carId: string) {
        return this.Car.findOne({ _id: carId }).populate('Car').exec();
    }
    
    async getCars() {
        return this.Car.find()
            .exec();
    }

    async updateCarById(
        carId: string,
        carFields: PatchCarDto | PutCarDto
    ) {
        const existingCar = await this.Car.findOneAndUpdate(
            { _id: carId },
            { $set: carFields },
            { new: true }
        ).exec();
    
        return existingCar;
    }

    async removeCarById(carId: string) {
        return this.Car.deleteOne({ _id: carId }).exec();
    }

    
}

export default new CarsDao();

