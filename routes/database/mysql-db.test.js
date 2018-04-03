const db = require('./mysql-db');

test('it should list of tables', () => {
  let table = {
    admin:'admin',
    teams:'teams',
    updates:'updates',
    descriptions:'descriptions'
  };
  expect(db.table).toEqual(table); 
})

