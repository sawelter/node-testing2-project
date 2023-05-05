/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('heroes').truncate()
  await knex('heroes').insert([
    {name: 'deku'},
    {name: 'bakugo'},
    {name: 'uravity'},
    {name: 'ingenium'}
  ]);
};
