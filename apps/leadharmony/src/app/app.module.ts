import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LeadModule } from './lead/lead.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StreamModule,
    LeadModule
  ],
})
export class AppModule {
}
