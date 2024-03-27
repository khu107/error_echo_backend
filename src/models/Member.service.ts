import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";

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

  public async login(input: LoginInput): Promise<any> {
    const member = await this.memberModel
      .findOne({ memberNick: input.memberNick }, { memberPassword: 1 })
      .exec();
    if (!member) throw new Error("Parol yoki nickName no tugri");

    const isMatch: boolean = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) throw new Error("Parol yoki nickName no tugri");
    return await this.memberModel.findById(member._id).exec();
  }
}

export default MemberService;
