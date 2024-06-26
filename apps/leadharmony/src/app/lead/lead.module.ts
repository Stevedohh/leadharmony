import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from '../prisma/prisma.service';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { SlackNotificationService } from './notification/notification.service';

@Module({
  imports: [ HttpModule ],
  controllers: [ LeadController ],
  providers: [ LeadService, PrismaService, SlackNotificationService ]
})
export class LeadModule {
}
