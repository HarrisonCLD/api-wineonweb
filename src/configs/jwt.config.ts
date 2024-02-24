import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

export default class JWTConfig {
  private secretkey: string;

  constructor() {
    dotenv.config();
    this.secretkey = process.env.SECRET_KEY as string;
  }

  public get_token(data: Array<any>): string | void {
    try {
      const headers = this.get_header();
      const payload = this.get_payload(data);
      return jwt.sign(payload, this.secretkey, headers);
    } catch (err) {
      console.log(err);
    }
  }

  private get_header(): object {
    return {
      // type: "JWT",
      // alg: "HS256",
    };
  }

  private get_payload(data: Array<any>): object {
    const currentTime = Math.floor(Date.now() / 1000);
    return {
      nbf: currentTime,
      iat: currentTime,
      jti: "unique_id",
      data: data,
    };
  }
}
