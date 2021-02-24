import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { UsersRepository } from '../repositories/usersRepository';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

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

    return res.json(user);
  }
}

export { UserController };
