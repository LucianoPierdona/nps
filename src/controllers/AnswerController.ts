import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/surveysUsersRepository';

export class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      return res.status(400).json({
        error: "survey user doesn't exist",
      });
    }

    surveyUser.value = value;

    await surveyUserRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}
