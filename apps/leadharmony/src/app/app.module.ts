import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LeadModule } from './lead/lead.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StreamModule,
    LeadModule
  ],
  controllers: [ AppController ],
  providers: [ AppService ]
})
export class AppModule {
}
