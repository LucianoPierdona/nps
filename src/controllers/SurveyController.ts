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

    return res.status(201).json(survey);
  }

  async show(req: Request, res: Response) {
    const surveyRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveyRepository.find();
    return res.json(surveys);
  }
}

export { SurveyController };
