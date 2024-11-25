const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

//middleware
app.use(cors());

//server side values
let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

function calculateTotalCartPrice(newItemPrice, cartTotal) {
  cartTotal = newItemPrice + cartTotal;
  return cartTotal.toString();
}

function checkMemberShip(cartTotal, isMember) {
  if (isMember) {
    cartTotal = cartTotal * ((100 - discountPercentage) / 100);
  }
  return cartTotal.toString();
}

function calculateTax(cartTotal) {
  let tax = cartTotal - cartTotal * ((100 - taxRate) / 100);
  return tax.toString();
}

function estimatedDeliveryTime(shippingMethod, distance) {
  let estimateDelivery;
  if (shippingMethod === 'standard') {
    estimateDelivery = distance / 50;
  } else if (shippingMethod === 'express') {
    estimateDelivery = distance / 100;
  }
  return estimateDelivery.toString();
}

function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost.toString();
}

function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * 2;
  return loyaltyPoints.toString();
}

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTotalCartPrice(newItemPrice, cartTotal));
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';

  res.send(checkMemberShip(cartTotal, isMember));
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal));
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod.toLowerCase();
  let distance = parseFloat(req.query.distance);
  res.send(estimatedDeliveryTime(shippingMethod, distance));
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance));
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
