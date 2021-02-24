import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/surveysRepository';

class SurveyController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;

    const surveyRepository = getCustomRepository(SurveysRepository);

    const survey = surveyRepository.create({
      description,
      title,
    });

    await surveyRepository.save(survey);

    return res.json(survey);
  }
}

export { SurveyController };
