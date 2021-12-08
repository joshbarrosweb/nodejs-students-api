import Sequelize, { Model } from "sequelize";

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        firstname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              arguments: [3, 255],
              message: "First Name must be between 3 and 255 chars.",
            },
          },
        },
        lastname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              arguments: [3, 255],
              message: "Last Name must be between 3 and 255 chars.",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            message: "Email already exists.",
          },
          validate: {
            isEmail: {
              message: "Invalid Email.",
            },
          },
        },
        age: {
          type: Sequelize.INTEGER,
          defaultValue: "",
          validate: {
            isInt: {
              message: "Age must be a INTEGER",
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              message: "Weight must be an INTEGER or FLOAT",
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              message: "Height must be an INTEGER or FLOAT",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: "student_id" });
  }
}
