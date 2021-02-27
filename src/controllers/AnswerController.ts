import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/appError';
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
      throw new AppError("Survey user doesn't exist", 400);
    }

    surveyUser.value = value;

    await surveyUserRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}
