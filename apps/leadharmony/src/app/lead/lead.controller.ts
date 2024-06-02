import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LeadService } from './lead.service';

@ApiTags('leads')
@Controller('leads')
export class LeadController {
  constructor(private readonly _leadService: LeadService) {}

  @Post()
  @ApiOperation({ summary: 'Create lead' })
  @ApiResponse({ status: 201, description: 'The lead has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Invalid input.'})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'John Doe' },
        phone: { type: 'string', example: '+1234567890' },
        ip: { type: 'string', example: '192.168.1.1' },
        userAgent: { type: 'string', example: 'Mozilla/5.0' },
        country: { type: 'string', example: 'USA' },
        email: { type: 'string', example: 'john.doe@example.com', nullable: true },
        address: { type: 'string', example: '123 Main St', nullable: true },
        tz: { type: 'string', example: 'America/New_York', nullable: true },
        createdAt: { type: 'string', example: '2022-01-01T00:00:00Z', nullable: true },
        updatedAt: { type: 'string', example: '2022-01-01T00:00:00Z', nullable: true },
        stream: {
          type: 'object',
          properties: {
            streamId: { type: 'string', example: 'your-stream-id' }
          }
        }
      },
    },
  })
  create(@Body() createLeadDto: Prisma.LeadCreateInput) {
    return this._leadService.createLead(createLeadDto);
  }
}
