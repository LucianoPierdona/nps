import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/usersRepository';
import * as Yup from 'yup';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({ error: err.errors });
    }

    const userRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await userRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    const user = userRepository.create({
      email,
      name,
    });

    await userRepository.save(user);

    return res.status(201).json(user);
  }
}

export { UserController };
