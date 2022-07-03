const { ERROR_TYPE } = require('./constant');

const getErrorMessage = (msg) => {
  return ERROR_TYPE[msg];
};

module.exports = getErrorMessage;
