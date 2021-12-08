import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
  async store(request, response) {
    const { email = '', password = '' } = request.body;

    if (!email || !password) {
      return response.status(401).json({
        errors: ['Invalid Credentials'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({
        errors: ['User doesnt exists'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return response.status(401).json({
        errors: ['User doesnt exists'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return response.json({ token, user: { name: user.name, id, email } });
  }
}

export default new UserController();
