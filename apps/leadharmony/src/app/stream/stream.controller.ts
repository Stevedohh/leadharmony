import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

import { StreamService } from './stream.service';

@ApiTags('stream')
@Controller('stream')
export class StreamController {
  constructor(private readonly _streamService: StreamService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create a new stream' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        partnerId: { type: 'number', example: 1 },
        apiToken: { type: 'string', example: 'your-api-token' },
        streamId: { type: 'string', example: 'your-stream-id' },
        offerId: { type: 'string', example: 'your-offer-id' },
        name: { type: 'string', example: 'your-stream-name', nullable: true },
      },
    },
  })
  async createStream(@Body() data: Prisma.StreamCreateInput) {
    return this._streamService.createStream(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all streams' })
  async getStreams() {
    return this._streamService.getStreams();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stream by id' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the stream' })
  async getStreamById(@Param('id') id: number) {
    return this._streamService.getStreamById(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a stream by id' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the stream' })
  async updateStream(@Param('id') id: number, @Body() data: Prisma.StreamUpdateInput) {
    return this._streamService.updateStream(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stream by id' })
  @ApiParam({ name: 'id', required: true, description: 'The id of the stream' })
  async deleteStream(@Param('id') id: number) {
    return this._streamService.deleteStream(Number(id));
  }
}
