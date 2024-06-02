import { Lead } from '@prisma/client';
import { WebClient } from '@slack/web-api';
import { Injectable } from '@nestjs/common';

export enum NotificationType {
  Send = 'send',
  Duplicate = 'duplicate',
}

@Injectable()
export class SlackNotificationService {
  slackClient: WebClient;

  constructor() {
    if (!this.slackClient) {
      this.slackClient = new WebClient(process.env.SLACK_TOKEN);
    }
  }

  async notifyLead(type: NotificationType, channelId: string, lead: Lead) {
    const token = process.env.SLACK_TOKEN;

    if (!token || !channelId) {
      return;
    }

    if (type === NotificationType.Send) {
      this.slackClient.chat.postMessage({
        blocks: [ {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*New Lead* :money_mouth_face: \n \`\`\` ${this._prettifyLead(lead)} \`\`\``
          }
        } ],
        channel: channelId
      });
    }

    if (type === NotificationType.Duplicate) {
      this.slackClient.chat.postMessage({
        blocks: [ {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Lead Duplicated* :face_with_raised_eyebrow: \n \`\`\` ${this._prettifyLead(lead)} \`\`\``
          }
        } ],
        channel: channelId
      });
    }
  }

  async notifyError(channelId: string, error: any) {
    const token = process.env.SLACK_TOKEN;

    if (!token || !channelId) {
      return;
    }

      this.slackClient.chat.postMessage({
        blocks: [ {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Error* :confounded: \n \`\`\` ${JSON.stringify(error, null, 2)} \`\`\``
          }
        } ],
        channel: channelId
      });
  }

  private _prettifyLead(lead: Lead) {
    return JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      ip: lead.ip,
      userAgent: lead.userAgent,
      country: lead.country,
      subId: lead.subId
    }, null, 2);
  }
}
