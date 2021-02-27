import { Request, Response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/surveysUsersRepository';

export class NpsController {
  async calculateNps(req: Request, res: Response) {
    const { surveyId } = req.params;

    const surveyUserRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveyUserRepository.find({
      surveyId,
      value: Not(IsNull()),
    });

    const detractor = surveysUsers.filter(
      (survey) => parseInt(survey.value) >= 0 && parseInt(survey.value) <= 6
    ).length;
    const promoter = surveysUsers.filter(
      (survey) => parseInt(survey.value) >= 9 && parseInt(survey.value) <= 10
    ).length;
    const passive = surveysUsers.filter(
      (survey) => parseInt(survey.value) >= 7 && parseInt(survey.value) <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = (((promoter - detractor) / totalAnswers) * 100).toFixed(
      2
    );

    return res.json({
      detractor,
      promoter,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}
