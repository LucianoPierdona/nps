import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    return res.send('fodase');
  }
}

export { UserController };
