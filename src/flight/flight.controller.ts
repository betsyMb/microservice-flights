// Nest
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

// Services
import { FlightService } from './flight.service';

// DTO
import { FlightDTO } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightrMSG } from 'src/common/constants';

@Controller()
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @MessagePattern(FlightrMSG.CREATE)
  create(@Payload() flightDTO: FlightDTO) {
    return this.flightService.create(flightDTO);
  }

  @MessagePattern(FlightrMSG.FIND_ALL)
  findAll() {
    return this.flightService.findAll();
  }

  @MessagePattern(FlightrMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.flightService.findOne(id);
  }

  @MessagePattern(FlightrMSG.UPDATE)
  update(@Payload() payload: any) {
    return this.flightService.update(payload.id, payload.flightDTO);
  }

  @MessagePattern(FlightrMSG.DELETE)
  delete(@Payload() id: string) {
    return this.flightService.delete(id);
  }

  @MessagePattern(FlightrMSG.ADD_PASSENGER)
  addPassenger(@Payload() payload: any) {
    return this.flightService.addPassenger(
      payload.flightId,
      payload.passengerId,
    );
  }
}
