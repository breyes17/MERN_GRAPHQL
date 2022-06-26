const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connect = require('./config/db');
const schema = require('./graphql-schema/index');
require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();

connect();
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == 'development',
  })
);

app.listen(port, () => console.log(`Server is up and running in port ${port}`));
