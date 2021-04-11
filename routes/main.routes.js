const router = require('express').Router();
const userController = require('../controllers/user.controller.js');
router.get('/', function (req, res) {
    res.send("Pagina inicial")
});

router.get('/users', userController.getUsers );
router.get('/userByID/:id', userController.getUserByID);

router.post('/addUser', userController.addUser);

router.delete('/deleteUser/:id', userController.deleteUser);
module.exports = router;



// Comentário para o teste das branchs