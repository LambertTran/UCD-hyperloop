const db = require('./mysql-db');

test('it should list of tables', () => {
  let table = {
    admin:'admin',
    teams:'teams',
    images:'images',
    descriptions:'descriptions'
  };

  expect(db.table).toEqual(table); 
})
