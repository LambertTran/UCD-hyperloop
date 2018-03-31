const HandleSendEmail = require('./send-email');

test('It should send email', async () => {
  expect.assertions(1);
  await expect(HandleSendEmail('hello')).rejects.toBe();
})