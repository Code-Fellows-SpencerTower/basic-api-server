'use strict';


const supertest = require('supertest');
// destructure app from server.js
const { app } = require('../lib/server.js');
const { db } = require('../lib/model');
const { beforeAll, afterAll } = require('jest-circus');
const request = supertest(app);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Testing food router', () => {

  it('Should read from food data', async () => {
    // make a req using http://localhost:3000/food?food=pizza
    // grab response
    let response = await request.get('/food');

    // expect response.status to equal 200
    expect(response.status).toEqual(200);
    // expect response.body to have food equal to pizza
    expect(response.body.count).toBeDefined();
    expect(response.body.results).toBeDefined();
  });

  it('Shoud read foods from query data', async () => {
    const response = await request.get('/food/1');

    expect(response.status).toEqual(200);
    expect(response.body.count).toEqual(1);
    expect(response.body.results).toBeDefined();
  });
});