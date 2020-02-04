import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import graphqlhttp from 'express-graphql';
import {buildSchema} from 'graphql';
//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var firebase = require('firebase/app');

require('firebase/firestore');

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBMxQRrVT5EhphWuCNrS88quzerzOcK9-Q",
    authDomain: "paddle-80c1e.firebaseapp.com",
    databaseURL: "https://paddle-80c1e.firebaseio.com",
    projectId: "paddle-80c1e",
    storageBucket: "paddle-80c1e.appspot.com",
    messagingSenderId: "1027671416064",
    appId: "1:1027671416064:web:e431d42d24f650c48727e5"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var studentSchema = buildSchema(
`
type Student{
  key: ID! // key is field name. ID is the field type telling that its the primary key. ! means not null. 
  age: Int!
  name: String!
}
`
)

var schoolSchema = buildSchema(
  `
type School{
  key: ID!
  location: String!
  students: Int!
  name: String!
  student: Student! // student in the school
}
`
)

var studentInputSchema = buildSchema(
  `
input StudentInput{
  age: Int!
  name: String!
}
`
)

var schoolInputSchema = buildSchema(
  `
input SchoolInput{
  location: String!
  students: Int!
  name: String!
  phone: String!
  student: StudentInput!
}
`
)

var querySchema = buildSchema(
  `
type Query{
  getStudentByUsername(name: String!): Student!
  getStudents: [Student!]!, //return back an array of students, student not nullable, array not nullable.
  getSchool(name: String!): School!
  getSchools: [School!]!
}
`
)

var mutationSchema = buildSchema(
  `
type Mutation{ //change database
  createStudent(input: StudentInput!): Student! // passing in student data and returning back a student object
  createSchool(input: SchoolInput!): School!
}
`
)

// building out our data structure
var schema = buildSchema( ` 
  type Query {
    hello: String
  }
`)

// building out our events
var root = {
  hello: () => {
    return 'hello world';
  }
}

// wiring it up to our server
app.use('/graphql', graphqlhttp({
  schema: schema,
  rootValue: root,
  graphiql: true //allows playground
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
