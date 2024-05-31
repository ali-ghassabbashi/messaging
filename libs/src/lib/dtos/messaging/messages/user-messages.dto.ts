import { OmitType } from "@nestjs/swagger";
import { UserMessageEntity } from "../../../entities/messaging";

export class SendMessage extends OmitType(UserMessageEntity, ['id']) {}