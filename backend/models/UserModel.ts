import { Document, Schema, Types, model, Model } from "mongoose";

export interface UserInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, Document {
  fufllName: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Types.ObjectId;
}

// export interface UserModel extends Model<UserDocument> {
//   buildUser(args: UserInput): UserDocument;
// }

const UserSchema: Schema<UserDocument> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      // maxlength: 50,
    },
    firstName: {
      type: String,
      // required: true,
      unique: true,
      // maxlength: 50,
    },
    lastName: {
      type: String,
      // required: true,
      unique: true,
      // maxlength: 50,
    },
    email: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User ID" },
  },
  {
    timestamps: true,
  }
);

// UserSchema.statics.buildUser = (args: UserDocument) => {
//   return new User(args);
// };

const User = model<UserDocument>("User", UserSchema);

export default User;
