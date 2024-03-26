import MemberModel from "../schema/Member.model";
import { Member, MemberInput } from "../libs/types/member";

import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
class MemberService {
  private readonly memberModel;
  constructor() {
    this.memberModel = MemberModel;
  }

  /* SPA */
  public async signup(input: MemberInput): Promise<Member> {
    const existingMember = await this.memberModel.findOne({
      memberNick: input.memberNick,
    });
    if (existingMember) {
      throw new Error("Duplicate memberNick. Please choose a different one.");
    }
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      return result.toObject();
    } catch (error) {
      console.error("Error, model:signup", error);
      throw error;
    }
  }
}

export default MemberService;
