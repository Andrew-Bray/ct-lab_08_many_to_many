const pool = require('../utils/pool');


module.exports = class Pizza {
  id;
  pizza;
  rating;

  constructor(row) {
    this.id = row.id;
    this.pizza = row.pizza;
    this.rating = row.rating;
  }

  static async insert({ pizza, rating, toppings = [] }) {
    const { rows } = await pool.query(
      `INSERT INTO pizzas (pizza, rating) 
      VALUES ($1, $2) RETURNING *`,
      [pizza, rating]
    );

    await pool.query(
      `INSERT INTO pizzas_toppings (pizza_id, topping_id)
      SELECT ${rows[0].id}, id FROM toppings WHERE ingredient=ANY($1::pizza[])`,
      [toppings]
    );

    return new Pizza(rows[0]);
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `SELECT
         pizzas.*,
         array_agg(toppings.ingredient) AS toppings
        FROM
          pizzas_toppings
        JOIN pizzas
        ON pizzas_toppings. topping_id = topping_id
        WHERE pizzas.id=$1
        GROUP BY pizzas.id`,
      [id]
    );
    if(!rows[0]) throw new Error(`Where's that pizza id: ${id}?`);

    return {
      ...new Pizza(rows[0]),
      ingredient: rows[0].ingredient
    };
  }

  static async find() {
    const { rows } = await pool.query(
      'SELECT * FROM pizzas');

    return rows.map(row => new Pizza(row)); 
  }

  static async update(id, {pizza, rating}) {
    const { rows } = await pool.query(
      `UPDATE pizzas SET
        pizza=$1,
        rating=$2
      WHERE id=$3 RETURNING *`,
      [pizza, rating, id]
    );

    return new Pizza(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM pizzas WHERE id=$1 RETURNING *'
    );
    return new Pizza(rows[0]);
  }
};
