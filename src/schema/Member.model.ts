import mongoose, { Schema } from "mongoose";
import { MemberType } from "../libs/enums/member.enum";
const memberSchema = new Schema(
  {
    memberType: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },

    memberPassword: {
      type: String,
      select: false, // db by default olib bermasin
      required: true,
    },

    memberDesc: {
      type: String,
    },
    memberImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", memberSchema);
