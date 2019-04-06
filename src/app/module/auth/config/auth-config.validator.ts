export function authConfigValidator(data: any): Error[] {
  const errors: Error[] = [];

  if (!data.authUrl) {
    errors.push(new Error(`AUTH_CONFIG - property 'authUrl' is required`));
  }

  return errors;
}
