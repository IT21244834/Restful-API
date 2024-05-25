const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Course = require('../models/contactModel');
const Notification = require('../models/notification');
const courseController = require('../controllers/courseController');

const app = express();
app.use(express.json());
app.post('/api/courses', courseController.createCourse);
app.get('/api/courses', courseController.getCourses);
app.get('/api/courses/:id', courseController.getCourse);
app.put('/api/courses/:id', courseController.updateCourse);
app.delete('/api/courses/:id', courseController.deleteCourse);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('Create a new course', async () => {
  const res = await request(app)
    .post('/api/courses')
    .send({
      name: 'Test Course',
      description: 'Test Description',
      credits: 3
    });
  expect(res.statusCode).toEqual(201);
  expect(res.body).toHaveProperty('name', 'Test Course');


  const notification = await Notification.findOne({ message: 'New course "Test Course" created' });
  expect(notification).toBeTruthy();
});

test('Get all courses', async () => {
  const res = await request(app).get('/api/courses');
  expect(res.statusCode).toEqual(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('Get a course by Id', async () => {
  const newCourse = new Course({
    name: 'Test Course',
    description: 'Test Description',
    credits: 3,
    user_id: 'userId'
  });
  await newCourse.save();

  const res = await request(app).get(`/api/courses/${newCourse.id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('name', 'Test Course');
});

test('Update a course', async () => {
  let newCourse = new Course({
    name: 'Test Course',
    description: 'Test Description',
    credits: 3,
    user_id: 'userId'
  });
  await newCourse.save();

  const res = await request(app)
    .put(`/api/courses/${newCourse._id}`)
    .send({
      description: 'Updated Description',
      credits: 4
    });

  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('description', 'Updated Description');
  expect(res.body).toHaveProperty('credits', 4);

  const notification = await Notification.findOne({ message: 'Course "Test Course" updated' });
  expect(notification).toBeTruthy();
});

test('Delete a course', async () => {
  let newCourse = new Course({
    name: 'Test Course',
    description: 'Test Description',
    credits: 3,
    user_id: 'userId'
  });
  await newCourse.save();

  const res = await request(app).delete(`/api/courses/${newCourse._id}`);
  expect(res.statusCode).toEqual(200);
  expect(res.body).toHaveProperty('name', 'Test Course');


  const notification = await Notification.findOne({ message: 'Course "Test Course" deleted' });
  expect(notification).toBeTruthy();
});
