const pool = require('../utils/pool');

module.exports = class Topping {
  id;
  ingredient;

  constructor(row) {
    this.id = row.id;
    this.ingredient = row.ingredient;
  }

  static async insert({ ingredient }) {
    const { rows } = await pool.query(
      `INSERT INTO toppings (ingredient)
      VALUES ($1) RETURNING *`,
      [ingredient]
    );

    return new Topping(rows[0]); 
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM toppings');
    
    return rows.map(row => new Topping(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM toppings
      WHERE id=$1 RETURNING *`,
      [id]
    );

    return new Topping(rows[0]);
  }

  static async update(id, { ingredient }) {
    const { rows } = await pool.query(  
      `UPDATE toppings
        SET ingredient=$1
        WHERE id=$2 
        RETURNING *`,
      [ingredient, id]
    );

    return new Topping(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM toppings
      WHERE id=$1
      RETURNING *`,
      [id]
    );

    return new Topping(rows[0]);
  }




};
