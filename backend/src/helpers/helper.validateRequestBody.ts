const RequiredFields = [
  "password",
  "firstName",
  "lastName",
  "email",
  "username",
];

export async function identifyUsernameOrEmailType(userId) {
  return userId ? "username" : "email";
}
export async function identifyUsernameOrEmailValue(username, email) {
  return username ? username : email;
}

export async function validateRequestBodyForSignup(userInput): Promise<{
  statusCode: number;
  message: string;
}> | null {
  for (const field in userInput) {
    if (!userInput[field]) {
      return createErrorResponse(field, userInput[field]);
    }
  }

  return null; //validation successful
}

//perhaps a validation for login and one for signup
export async function validateRequestBodyForLogin(loginFields: {
  userIdType: string;
  password: string | undefined;
}): Promise<{
  statusCode: number;
  message: string;
} | null> {
  let userIdFieldValue = Object.values(loginFields)[0];
  let passwordFieldValue = Object.values(loginFields)[1];
  console.log("password field value", passwordFieldValue);
  if (!passwordFieldValue) {
    console.log("inside if", passwordFieldValue);
    return createErrorResponse("password field", passwordFieldValue);
  }
  for (let i = 0; i < RequiredFields.length; i++) {
    if (userIdFieldValue === RequiredFields[i]) {
      return null; //validation successful
    }
  }
}

export function createErrorResponse(
  fieldName: string,
  value: string | unknown
): { statusCode: number; message: string } {
  console.log("create response", fieldName, value);
  return {
    message: `Could not read ${fieldName}: '${value}'`,
    statusCode: 400,
  };
}
