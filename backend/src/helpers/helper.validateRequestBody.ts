export function validateBody(userInput: Object): {
  statusCode: number;
  message: string;
} | null {
  const requiredFields = {
    email: "email",
    password: "password",
    firstName: "first name",
    lastName: "last name",
    username: "username",
  };

  for (const field in requiredFields) {
    if (!userInput[field]) {
      return createErrorResponse(requiredFields[field], userInput[field]);
    }
  }

  return null; //validation successful
}

export function createErrorResponse(
  fieldName: string,
  value: string
): { statusCode: number; message: string } {
  return {
    statusCode: 400,
    message: `Something wrong with ${fieldName}: ${value}`,
  };
}
