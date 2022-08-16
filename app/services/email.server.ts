import nodemailer from "nodemailer";

class EmailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_PROVIDER,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  transport(options) {
    const derivedOptions = {
      to: process.env.EMAIL_ADDRESS,
      from: process.env.EMAIL_ADDRESS,
      ...options,
    };

    return new Promise((resolve, reject) => {
      this.transporter.sendMail(derivedOptions, function (error, info) {
        if (error) {
          return reject(error);
        }

        return resolve(info.response);
      });
    });
  }
}

export default new EmailService();
