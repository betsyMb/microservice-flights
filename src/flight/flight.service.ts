// Nest
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// Third party
import { Model } from 'mongoose';

// Models
import { FLIGHT } from 'src/common/models/models';

// Interface
import { IFlight } from 'src/common/interfaces/flight.interface';

// DTO
import { FlightDTO } from './dto/flight.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
  ) {}

  async create(flightDTO: FlightDTO): Promise<IFlight> {
    const newFlight = new this.model(flightDTO);
    return await newFlight.save();
  }

  async findAll(): Promise<IFlight[]> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight> {
    return await this.model.findById(id).populate('passengers');
  }

  async update(id: string, flightDTO: FlightDTO): Promise<IFlight> {
    return await this.model.findByIdAndUpdate(id, flightDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'Deleted',
    };
  }

  async addPassenger(flightId: string, passengerId: string): Promise<IFlight> {
    return await this.model
      .findByIdAndUpdate(
        flightId,
        { $addToSet: { passengers: passengerId } },
        { new: true },
      )
      .populate('passengers');
  }
}
