import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import database from './../../config/database.js';
import { JWT_SECRET } from '../../config/config.js';

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async setPassword(password: string): Promise<void> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    this.password = hash;
  }

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public generateToken(): string {
    const payload = { id: this.id };
    const options = { expiresIn: '1h' };
    const secret = JWT_SECRET as string;
    return jwt.sign(payload, secret, options);
  }

  public static verifyToken(token: string): JwtPayload {
    const secret = JWT_SECRET as string;
    return jwt.verify(token, secret) as JwtPayload;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database.connection,
    freezeTableName: true,
    indexes: [{ unique: true, fields: ['email'] }],
  }
);

User.beforeCreate(async (user: User) => {
  await user.setPassword(user.password);
});

export default User;
