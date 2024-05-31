import { OmitType, PickType } from "@nestjs/swagger";
import { MessageMetadataEntity } from "../../../entities/messaging";

export class CreateMessageMetadata extends OmitType(MessageMetadataEntity, ['id']) {}

export class UpdateMessageMetadata extends PickType(CreateMessageMetadata, ['caption', 'fileUrl']) {}