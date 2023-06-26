interface RequiredFields {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export function validateBody(userInput: RequiredFields): {
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
  value: string
): { statusCode: number; message: string } {
  return {
    statusCode: 400,
    message: `Something wrong with ${fieldName}: ${value}`,
  };
}
