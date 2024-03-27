import { MemberType } from "../enums/member.enum";
import { Request } from "express";
import { Session } from "express-session";

export interface Member {
  memberType: MemberType;
  memberNick: string;
  memberPassword: string;
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

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface AdminRequest extends Request {
  member: Member;
  session: Session & { member: Member };
  // file: Express.Multer.File;
  // files: Express.Multer.File[];
}
