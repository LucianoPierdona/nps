import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/surveysRepository';
import { SurveysUsersRepository } from '../repositories/surveysUsersRepository';
import { UsersRepository } from '../repositories/usersRepository';
import SendMailService from '../services/SendMailService';

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

    const surveyUser = surveysUsersRepository.create({
      userId: user.id,
      surveyId: survey.id,
    });

    await surveysUsersRepository.save(surveyUser);

    await SendMailService.sendMail(
      user.email,
      survey.title,
      survey.description
    );

    return res.status(200).json(surveyUser);
  }
}

export { SendMailController };
