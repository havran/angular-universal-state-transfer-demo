export function appConfigValidator(data: any): Error[] {
  const errors: Error[] = [];

  if (!data.apiUrl) {
    errors.push(new Error(`APP_CONFIG - property 'apiUrl' is required`));
  }

  return errors;
}
