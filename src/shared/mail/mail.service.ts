import * as nodemailer from "nodemailer";
import { config } from "../../app/app.config";

export interface MailPayload {
  to: String;
  subject: String;
  content: String;
}

class MailService {
  async sendMail(payload: MailPayload) {
    await this.getTransporter().sendMail({
      from: config.smtp.user,
      to: payload.to,
      subject: payload.subject,
      html: payload.content,
    });
  }

  getTransporter() {
    return nodemailer.createTransport({
      service: "gmail",
      host: config.smtp.host,
      port: config.smtp.port,
      secure: true,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.password,
      },
    });
  }
}

export const mailService = new MailService();
