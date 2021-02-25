import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure, // true for 465, false for other ports
          auth: {
            user: account.user, // generated ethereal user
            pass: account.pass, // generated ethereal password
          },
        });

        this.client = transporter;
      })
      .catch((err) => new Error(err));
  }

  async sendMail(to: string, subject: string, body: string) {
    const message = await this.client.sendMail({
      from: 'NPS <noreply@piersgroup.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      html: body, // html body
    });

    console.log('Message sent', message.messageId);
    console.log('Message sent', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
