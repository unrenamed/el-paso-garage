var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const users = [
    { id: 1, name: 'John', age: 20 },
    { id: 2, name: 'Mike', age: 17 },
    { id: 3, name: 'Jane', age: 32 }
  ];
  res.json(users);
});

module.exports = router;
