import * as ejs from "ejs";
import { User } from "../../collection/user/user.interface";
import { config } from "../../app/app.config";

const SIGNUP_SUCCESS_MAIL_TEMPLATE =
  "./public/email-template/signup-success.ejs";

class MailRender {
  async renderSignupSuccess(user: User): Promise<string> {
    return ejs.renderFile(SIGNUP_SUCCESS_MAIL_TEMPLATE, {
      user,
    });
  }
}

export const mailRenderService = new MailRender();
