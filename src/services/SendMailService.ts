import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';

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

  async sendMail(to: string, subject: string, variables: object, path: string) {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const html = mailTemplateParse(variables);

    const message = await this.client.sendMail({
      from: 'NPS <noreply@piersgroup.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      html, // html body
    });

    console.log('Message sent', message.messageId);
    console.log('Message sent', nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();
