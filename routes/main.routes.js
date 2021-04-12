const router = require('express').Router();
const userController = require('../controllers/pipedriveController.js');
const moloniController = require('../controllers/moloniController.js');
router.get('/', function (req, res) {
    res.send("Pagina inicial")
});
//Pipedrive
router.get('/users', userController.getUsers );
router.get('/userByID/:id', userController.getUserByID);

router.post('/addUser', userController.addUser);
router.post('/addMaterialManager', userController.addMaterialManager);
router.post('/addTicketManager', userController.addTicketManager);

router.put('/putData/:id', userController.updateData);

router.delete('/deleteUser/:id', userController.deleteUser);
module.exports = router;

//Moloni
router.get('/bills', moloniController.getAllBills);
router.get('/billsByID', moloniController.getBillsByID);

// Comentário para o teste das branchs