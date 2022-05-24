export const configDatabase =
  process.env.Node_ENV === 'TEST'
    ? process.env.DATABASE_TEST_URL
    : process.env.DATABASE_URL;
