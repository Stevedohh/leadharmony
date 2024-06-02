import { Lead, Stream } from '@prisma/client';
import { HttpService } from '@nestjs/axios';

abstract class SendLeadStrategy {
  abstract sendLead(stream: Stream, lead: Lead): Promise<void>;
}

export class TrafficLightPartner extends SendLeadStrategy {
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
