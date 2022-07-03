const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const connect = require('./config/db');
const schema = require('./graphql-schema/index');
const getErrorMessage = require('./config/error-handler');
require('dotenv').config();

const port = process.env.PORT || 8000;
const app = express();

connect();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV == 'development',
    customFormatErrorFn: (err) => {
      const error = getErrorMessage(err.message);
      return { message: error.message, code: error.statusCode };
    },
  })
);

app.listen(port, () => console.log(`Server is up and running in port ${port}`));
