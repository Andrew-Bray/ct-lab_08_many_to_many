const express = require('express');
const app = express();
const Pizza = require('./models/pizzas');
const Topping = require('./models/toppings');

app.use(express.json());

// my PIZZA CRUD route
app.post('/api/v1/pizzas', (req, res, next) => {
  Pizza
    .insert(req.body)
    .then(pizza => res.send(pizza))
    .catch(next);
    
});

app.get('api/v1/pizzas/:id', (req, res, next) => {
  Pizza
    .findById(req.params.id)
    .then(pizza => res.send(pizza))
    .catch(next);
});

app.get('api/v1/pizzas', (req, res, next) => {
  Pizza
    .find()
    .then(pizzas => res.send(pizzas))
    .catch(next);
});

app.put('api/v1/pizzas/:id', (req, res, next) => {
  Pizza
    .update(req.params.id, req.body)
    .then(pizza => res.send(pizza))
    .catch(next);
});

app.delete('api/v1/pizzas/:id', (req, res, next) => {
  Pizza
    .delete(req.params.id)
    .then(pizza => res.send(pizza))
    .catch(next);
});

// myTOPPINGS CRUD route
app.post('/api/v1/toppings', (req, res, next) => {
  Topping
    .insert(req.body)
    .then(topping => res.send(topping))
    .catch(next);
    
});

app.get('api/v1/toppings/:id', (req, res, next) => {
  Topping
    .findById(req.params.id)
    .then(topping => res.send(topping))
    .catch(next);
});

app.get('api/v1/toppings', (req, res, next) => {
  Topping
    .find()
    .then(toppings => res.send(toppings))
    .catch(next);
});

app.put('api/v1/toppings/:id', (req, res, next) => {
  Topping
    .update(req.params.id, req.body)
    .then(topping => res.send(topping))
    .catch(next);
});

app.delete('api/v1/toppings/:id', (req, res, next) => {
  Topping
    .delete(req.params.id)
    .then(topping => res.send(topping))
    .catch(next);
});

module.exports = app;
