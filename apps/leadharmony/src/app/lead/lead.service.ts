import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Lead, Prisma, Stream } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { PartnerEnum } from '.prisma/client';
import { TrafficLightPartner } from './partner/partner-strategies';
import { NotificationType, SlackNotificationService } from './notification/notification.service';


@Injectable()
export class LeadService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _httpService: HttpService,
    private readonly _slackNotificationService: SlackNotificationService
  ) {
  }

  async createLead(data: Prisma.LeadCreateInput) {
    const existingLead: Lead = await this._prismaService.lead.findFirst({ where: { phone: data.phone } });
    const lead: Lead = await this._prismaService.lead.create({ data });
    const stream: Stream = await this._prismaService.stream.findUnique({ where: { id: lead.streamId } })

    if (existingLead) {
      await this._slackNotificationService.notifyLead(NotificationType.Duplicate, stream.slackChannelId, existingLead);

      throw new HttpException('Lead already exists', HttpStatus.CONFLICT);
    }

    try {
      switch (stream.partner) {
        case PartnerEnum.TrafficLight: {
          const trafficLight = new TrafficLightPartner(this._httpService);
          const sendedLead = await trafficLight.sendLead(stream, lead);
          await this._slackNotificationService.notifyLead(NotificationType.Send, stream.slackChannelId, lead);

          return sendedLead.data;
        }
        default:
          break;
      }
    } catch (error) {
      await this._slackNotificationService.notifyError(stream.slackChannelId, {
        status: error.response.status,
        statusText: error.response.statusText,
        responseData: error.response.data,
        payload: data
      });

      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
