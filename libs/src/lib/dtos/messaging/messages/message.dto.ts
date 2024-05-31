import { OmitType, PickType } from "@nestjs/swagger";
import { MessageEntity } from "../../../entities/messaging";

export class CreateMessageDto extends OmitType(MessageEntity, ['id']) {}

export class UpdateMessageDto extends PickType(CreateMessageDto, ['content', 'metadata']) {}