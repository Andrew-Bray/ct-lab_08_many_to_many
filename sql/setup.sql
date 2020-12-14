DROP TABLE IF EXISTS pizzas CASCADE;
DROP TABLE IF EXISTS toppings CASCADE;
DROP TABLE IF EXISTS pizzas_toppings;

CREATE TABLE pizzas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  pizza TEXT NOT NULL,
  rating INTEGER CHECK (rating > 0)
  );

CREATE TABLE toppings (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ingredient VARCHAR(128)
);

CREATE TABLE pizzas_toppings (
  pizza_id BIGINT REFERENCES toppings(id),
  topping_id BIGINT REFERENCES pizzas(id),
  PRIMARY KEY(pizza_id, topping_id)
);
