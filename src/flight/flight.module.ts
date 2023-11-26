// Nest
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { FlightController } from './flight.controller';

// Services
import { FlightService } from './flight.service';

// Schema
import { FlightSchema } from './schema/flight.schema';
import { PassengerSchema } from './schema/passenger.schema';

// Models
import { FLIGHT, PASSENGER } from 'src/common/models/models';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: FLIGHT.name,
        useFactory: () => FlightSchema.plugin(require('mongoose-autopopulate')),
      },
      {
        name: PASSENGER.name,
        useFactory: () => PassengerSchema,
      },
    ]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
