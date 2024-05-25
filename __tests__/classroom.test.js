const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Classroom = require('../models/classroom');
const classroomController = require('../controllers/classroomController');

const app = express();
app.use(express.json());
app.post('/api/classroom', classroomController.createClassroom);
app.get('/api/classroom', classroomController.getClassrooms);
app.get('/api/classroom/:id', classroomController.getClassroom);
app.put('/api/classroom/:id', classroomController.updateClassroom);
app.delete('/api/classroom/:id', classroomController.deleteClassroom);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('Create a new classroom', async () => {
  const res = await request(app)
    .post('/api/classroom')
    .send({
      ClassName: 'Test Classroom',
      State: 'Active',
      Capacity: 30,
      Facilities: ['Projector', 'Whiteboard']
    });
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('ClassName', 'Test Classroom');
});

test('Get all classrooms', async () => {
  const res = await request(app).get('/api/classroom');
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('Get a classroom by Id', async () => {
  const newClassroom = new Classroom({
    ClassName: 'Test Classroom',
    State: 'Active',
    Capacity: 30,
    Facilities: ['Projector', 'Whiteboard']
  });
  await newClassroom.save();

  const res = await request(app).get(`/api/classroom/${newClassroom.id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('ClassName', 'Test Classroom');
});

test('Update a classroom', async () => {
  let newClassroom = new Classroom({
    ClassName: 'Test Classroom',
    State: 'Active',
    Capacity: 30,
    Facilities: ['Projector', 'Whiteboard']
  });
  await newClassroom.save();

  const res = await request(app)
    .put(`/api/classroom/${newClassroom._id}`)
    .send({
      ClassName: 'Updated Classroom',
      State: 'Inactive',
      Capacity: 25,
      Facilities: ['Projector', 'Whiteboard', 'Microphone']
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('ClassName', 'Updated Classroom');
});

test('Delete a classroom', async () => {
  let newClassroom = new Classroom({
    ClassName: 'Test Classroom',
    State: 'Active',
    Capacity: 30,
    Facilities: ['Projector', 'Whiteboard']
  });
  await newClassroom.save();

  const res = await request(app).delete(`/api/classroom/${newClassroom._id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('ClassName', 'Test Classroom');
});
