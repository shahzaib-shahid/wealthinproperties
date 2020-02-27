const express = require('express');
const router = express.Router();
const formController = require('../controllers/Form');
const validate = require('express-validation');
const joiSchema = require('../Validation/schemas');
const middleware = require('../Middleware/middleware');



router.post('/add', validate(joiSchema.add), formController.add);
router.get('/get', formController.getAll);
router.get('/getbyid', formController.getById);
router.post('/updatebyid', validate(joiSchema.add), formController.updateById);

module.exports = router;