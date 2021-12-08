import User from "../models/User";

class UserController {
  async store(request, response) {
    try {
      const newUser = await User.create(request.body);
      const { id, name, email } = newUser;
      return response.json({ id, name, email });
    } catch (error) {
      return response.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async index(request, response) {
    try {
      const users = await User.findAll();
      return response.json(users);
    } catch (error) {
      return response.json(null);
    }
  }

  async show(request, response) {
    try {
      const user = await User.findByPk(request.params.id);

      const { id, nome, email } = user;

      return response.json({ id, nome, email });
    } catch (error) {
      return response.json(null);
    }
  }

  async update(request, response) {
    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(400).json({
          errors: ["User doesnt exists"],
        });
      }

      const newData = await user.update(request.body);

      const { id, nome, email } = newData;

      return response.json({ id, nome, email });
    } catch (error) {
      return response.json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(request, response) {
    try {
      const user = await User.findByPk(request.params.id);

      if (!user) {
        return response.status(400).json({
          errors: ["User doesnt exists"],
        });
      }

      await user.destroy();
      return response.json(null);
    } catch (error) {
      return response.json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
