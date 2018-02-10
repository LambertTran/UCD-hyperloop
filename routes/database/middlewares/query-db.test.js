const QueryDatabase = require('./query-db');

let newQuery = new QueryDatabase({
  team: 'wheels',
});

test('Should return 7 teams', async () => {
  expect.assertions(1);
  let teams = await newQuery.GetTeams();
  expect(teams.length).toBe(7)
})

test('Should return team detail: image link and description', async () => {
  expect.assertions(4);

  let teamDetail = await newQuery.GetSubTeamDetail();
  expect(teamDetail.length).toBe(1);
  expect(Object.keys(teamDetail[0]).length).toBe(4);
  expect(typeof teamDetail[0].team_img).toBe('string');
  expect(typeof teamDetail[0].team_detail).toBe('string');
  
})


