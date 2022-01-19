import { DataTypes, Model } from "denodb";

export class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    username: { ...DataTypes.string(32), unique: true },
    firstName: { ...DataTypes.string(32), allowNull: true },
    lastName: { ...DataTypes.string(32), allowNull: true },
    email: { ...DataTypes.string(255), unique: true },
    nickname: { ...DataTypes.string(32), allowNull: true },
    sysAdmin: { type: DataTypes.BOOLEAN, allowNull: false },
  };

  static defaults = {
    sysAdmin: false,
  };

  id!: number;
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  nickname!: string;
  sysAdmin!: boolean;
}
