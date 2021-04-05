const router = require('express').Router();
const userController = require('../controllers/user.controller.js');
router.get('/', function (req, res) {
    res.send("Pagina inicial")
});

router.get('/users', userController.getUsers );

module.exports = router;