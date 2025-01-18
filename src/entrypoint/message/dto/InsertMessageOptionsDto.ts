import { Param, ParamType } from '@discord-nestjs/core';
import { MessageType } from '../../../domain/message/vo/MessageType';

export class InsertMessageOptionsDto {
  @Param({
    name: 'message_type',
    description: 'Type of the messages',
    type: ParamType.STRING,
    required: true,
  })
  messageType: MessageType;
}
