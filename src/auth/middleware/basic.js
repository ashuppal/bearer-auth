'use strict';

const base64 = require('base-64');
const { users } = require('../models/index.js');


module.exports = async (req, res, next) => {

  function _authError() {
    res.status(403).send('Invalid Login');
  }


  if (!req.headers.authorization) { return _authError(); }

  let basic = req.headers.authorization.split(' ')[1];
  let [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}