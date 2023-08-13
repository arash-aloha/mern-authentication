import UserModel from "./UserModel";

export interface ResponseObject {
  data: typeof UserModel | null;
  message: string;
  statusCode: number;
}

export interface UserObject {
  user: {
    firstName: string;
    email: string;
    authentication: {
      sessionToken: string;
    };
  };
}
