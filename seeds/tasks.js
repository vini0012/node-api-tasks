exports.seed = async function(knex) {
  await knex('tasks').del()
  await knex('tasks').insert([
    {id: 1, title: 'Arrumar a cama', completed: 'true'},
    {id: 2, title: 'Lavar a louça', completed: 'false'},
    {id: 3, title: 'Passear com o cachorro', completed: 'false'},
    {id: 4, title: 'Fazer almoço', completed: 'true'}
  ]);
};