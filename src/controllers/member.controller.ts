import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { Member, MemberInput } from "../libs/types/member";

// REACT

const memberService = new MemberService();

const memberController: T = {};
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body,
      result: Member = await memberService.signup(input);

    res.json({ member: result });
  } catch (error: any) {
    console.log(error.message);
    if (
      error.message === "Duplicate memberNick. Please choose a different one."
    ) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
  } catch (error) {
    console.log("Error, login", error);
  }
};

export default memberController;
