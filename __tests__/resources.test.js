const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Resource = require('../models/resources');
const resourceController = require('../controllers/resourceController');

const app = express();
app.use(express.json());
app.post('/resources', resourceController.createresources);
app.get('/resources', resourceController.getresources);
app.get('/resources/:id', resourceController.getresources);
app.put('/resources/:id', resourceController.updateresources);
app.delete('/resources/:id', resourceController.deleteresources);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('Create a new resource', async () => {
  const res = await request(app)
    .post('/resources')
    .send({
      name: 'Test Resource',
      state: 'Avalable'
    });
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('resource');
});

test('Get all resources', async () => {
  const res = await request(app).get('/resource');
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('resources');
  expect(res.body.resources.length).toBeGreaterThanOrEqual(1);
});

test('Get a resource by ID', async () => {
  const newResource = new Resource({
    name: 'Test Resource',
    state: 'Avalable'
  });
  await newResource.save();

  const res = await request(app).get(`/resource/${newResource.id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('resource');
  expect(res.body.resource.name).toEqual('Test Resource');
});

test('Update a resource', async () => {
  let newResource = new Resource({
    name: 'Test Resource',
    state: 'Avalable'
  });
  await newResource.save();

  const res = await request(app)
    .put(`/resources/${newResource.id}`)
    .send({
      name: 'Updated Resource',
      state: 'Not Avalable'
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('resource');
  expect(res.body.resource.name).toEqual('Updated Resource');
  expect(res.body.resource.state).toEqual('Inactive');
});

test('Delete a resource by ID', async () => {
  let newResource = new Resource({
    name: 'Test Resource',
    state: 'Avalable'
  });
  await newResource.save();

  const res = await request(app).delete(`/resources/${newResource.id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('resource');
});
