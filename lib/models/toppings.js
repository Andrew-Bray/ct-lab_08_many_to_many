const pool = require('../utils/pool');

module.exports = class Topping {
  id;
  ingredient;

  constructor(row) {
    this.id = row.id;
    this.ingredient = row.ingredient;
  }

  static async insert ({ ingredient }) {
    const { rows } = await pool.query(
      `INSERT INTO toppings (ingredient)
      VALUES ($1) RETURNING *`,
       [ingedient]
    );

    return new Topping(rows[0]); 
  }




)