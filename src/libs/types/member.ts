import { MemberType } from "../enums/member.enum";

export interface Member {
  memberType: MemberType;
  memberNick: string;
  memberPassword?: string;
  memberDesc?: string;
  memberImage?: string;
}

export interface MemberInput {
  memberType?: MemberType;
  memberNick: string;
  memberPassword: string;
  memberDesc?: string;
  memberImage?: string;
}
