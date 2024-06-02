import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Lead, Prisma, Stream } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { PartnerEnum } from '.prisma/client';

abstract class SendLeadStrategy {
  abstract sendLead(stream: Stream, lead: Lead): Promise<void>;
}

class TrafficLightSendLead extends SendLeadStrategy {
  constructor(
    protected readonly _httpService: HttpService
  ) {
    super();
  }

  async sendLead(stream: Stream, lead: Lead): Promise<any>  {
    return this._httpService.post('http://api.cpa.tl/api/lead/send', {
      key: stream.apiToken,
      id: lead.id,
      offer_id: +stream.offerId,
      stream_hid: stream.streamId,
      ip_address: lead.ip,
      name: lead.name,
      phone: lead.phone,
      country: lead.country,
      user_agent: lead.userAgent,
      sub1: lead.subId,
    }).toPromise()
  }
}


@Injectable()
export class LeadService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _httpService: HttpService
  ) {
  }

  async createLead(data: Prisma.LeadCreateInput) {
    const existingLead: Lead = await this._prismaService.lead.findFirst({ where: { phone: data.phone } });

    if (existingLead) {
      console.log('NOTIFY: Lead already exists');

      return;
    }

    const lead: Lead = await this._prismaService.lead.create({ data });
    const stream: Stream = await this._prismaService.stream.findUnique({ where: { id: lead.streamId } })

    try {
      switch (stream.partner) {
        case PartnerEnum.TrafficLight: {
          const trafficLightSendLead = new TrafficLightSendLead(this._httpService);
          await trafficLightSendLead.sendLead(stream, lead);

          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log('NOTIFY: Error');

      console.log(error);
    }

    console.log('NOTIFY: Lead created');
  }
}
