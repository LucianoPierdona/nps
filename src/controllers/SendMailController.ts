import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/surveysRepository';
import { SurveysUsersRepository } from '../repositories/surveysUsersRepository';
import { UsersRepository } from '../repositories/usersRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';

class SendMailController {
  async sendMail(req: Request, res: Response) {
    const { email, surveyId } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ error: "This user doesn't exist" });
    }

    const survey = await surveysRepository.findOne(surveyId);

    if (!survey) {
      return res.status(400).json({ error: "This survey doesn't exist" });
    }

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const surveyUserAlreadyExist = await surveysUsersRepository.findOne({
      where: {
        userId: user.id,
        value: null,
      },
      relations: ['user', 'survey'],
    });

    const variables = {
      name: user.email,
      title: survey.title,
      description: survey.description,
      id: '',
      link: process.env.MAIL_URL,
    };

    if (surveyUserAlreadyExist) {
      variables.id = surveyUserAlreadyExist.id;
      await SendMailService.sendMail(email, survey.title, variables, npsPath);
      return res.json(surveyUserAlreadyExist);
    }

    const surveyUser = surveysUsersRepository.create({
      userId: user.id,
      surveyId: survey.id,
    });

    await surveysUsersRepository.save(surveyUser);

    variables.id = surveyUser.id;
    await SendMailService.sendMail(
      user.email,
      survey.title,
      variables,
      npsPath
    );

    return res.status(200).json(surveyUser);
  }
}

export { SendMailController };
