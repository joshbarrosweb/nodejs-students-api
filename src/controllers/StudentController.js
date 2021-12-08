import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(request, response) {
    const students = await Student.findAll({
      attributes: ['id', 'firstname', 'lastname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['url', 'filename'],
      },
    });

    response.json(students);
  }

  async show(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const student = await Student.findByPk(id, {
        attributes: ['id', 'firstname', 'lastname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return response.status(400).json({
          errors: ['Student doesnt exists.'],
        });
      }

      return response.json(student);
    } catch (error) {
      return response.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async store(request, response) {
    try {
      const student = await Student.create(request.body);

      return response.json(student);
    } catch (error) {
      return response.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return response.status(400).json({
          errors: ['Student doesnt exists.'],
        });
      }

      const updatedStudent = await student.update(request.body);

      return response.json(updatedStudent);
    } catch (error) {
      return response.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      if (!id) {
        return response.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return response.status(400).json({
          errors: ['Student doesnt exists.'],
        });
      }

      await student.destroy();
      return response.json({
        deleted: true,
      });
    } catch (error) {
      return response.status(400).json({
        errors: error.errors.map((err) => err.message),
      });
    }
  }
}

export default new StudentController();
