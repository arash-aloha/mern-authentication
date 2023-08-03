const RequiredFields = [
  "password",
  "firstName",
  "lastName",
  "email",
  "username",
];

export function idTypeUsernameOrEmail(userId: string): string {
  return userId ? "username" : "email";
}
export function idValueUsernameOrEmail(
  username: string,
  email: string
): string {
  return username ? username : email;
}

export function validateRequestBodyForLogin(loginFields: {
  userIdType: string | undefined;
  password: string | undefined;
}): {
  statusCode: number;
  message: string;
} | null {
  const userIdFieldValue = Object.values(loginFields)[0];
  const passwordFieldValue = Object.values(loginFields)[1];

  if (!passwordFieldValue) {
    return createErrorResponse("password field", passwordFieldValue);
  }
  for (let i = 0; i < RequiredFields.length; i++) {
    if (userIdFieldValue === RequiredFields[i]) {
      return null; //validation successful
    }
  }
}

export function validateRequestBody(userInput: any): {
  statusCode: number;
  message: string;
} | null {
  for (const field in userInput) {
    if (!userInput[field]) {
      return createErrorResponse(field, userInput[field]);
    }
  }

  return null; //validation successful
}

export function createErrorResponse(
  fieldName: string,
  value: string | unknown
): { statusCode: number; message: string } {
  return {
    message: `Could not read ${fieldName}: '${value}'`,
    statusCode: 400,
  };
}
