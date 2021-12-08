import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      errors: ['Login Required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return response.status(401).json({
        errors: ['Invalid user'],
      });
    }

    request.userId = id;
    request.userEmail = email;
    return next();
  } catch (error) {
    return response.status(401).json({
      errors: ['Expired or invalid token'],
    });
  }
};
