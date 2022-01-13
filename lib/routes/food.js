'use strict';

const express = require('express');

const router = express.Router();

const app = express();
app.use(express.json());

// node.js - will pull from index.js file automatically if in directory
const { FoodModel } = require('../model');
// const Food = require('../model/food.schema');

router.get('/food', read);
router.get('/food/:id', read);
router.post('/food', create);
router.put('/food:id', update);
router.delete('/food:id', remove);

async function read(req, res, next) {
  console.log('Reading from food route');

  let { id } = req.params;
  let foods;
  if (id) {
    foods = await FoodModel.findOne({ where: id });
  } else {
    foods = await FoodModel.findAll({ where: id });
  }

  let resObj = {
    count: foods ? foods.length : 1,
    results: foods,
  };
  res.status(200).json(resObj);
}

async function create(req, res, next) {
  console.log('food create hit');
  const newFood = await FoodModel.create({ name: 'apple', category: 'fruit', amount: 1 });
  console.log('newFood: ', newFood);
  res.send('working on it');
}

function update(req, res, next) {

  res.send('working on it');
}

async function remove(req, res, next) {
  console.log('Remove function hit');
  let { id } = req.params;
  if (id) {
    await FoodModel.destroy({ where: id });
  }



  res.send('working on it');

}

module.exports = router;