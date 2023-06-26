import UserModel, { IUserDocument, IUserInput } from "../models/UserModel";

export async function signupService(values: IUserInput) {
  try {
    let user = new UserModel<IUserDocument>();
    user.email = values.email;
    user.firstName = values.firstName;
    user.lastName = values.lastName;
    user.username = values.username;
    await user.setPassword(values.password);

    const newUserToDatabase = await user.save();
    console.log("USER TO DATABASE: ");
    console.log("- ", newUserToDatabase);
    return newUserToDatabase
      ? {
          message: "New user created.",
          statusCode: 201,
        }
      : {
          message: "Could not save user to database.",
          statusCode: 401,
        };
  } catch (error) {
    console.error("ERROR - creating user: ", error);
    return {
      message: "Could not create user",
      statusCode: 500,
    };
  }
}
