const router = require('express').Router();
const path = require('path');
const userController = require('../controllers/pipedriveController.js');
const moloniController = require('../controllers/moloniController.js');
const jasminController = require('../controllers/jasminController.js');
const openWeather = require('../controllers/openWeather.js')

const pipedriveController = require('../controllers/pipedriveController.js');
const invoiceController = require('../controllers/invoiceController.js');
router.get('/', function (req, res) {
    console.log(__dirname)
    res.send("Página Inicial");
});

//Pipedrive
router.get('/users', userController.getUsers );
router.get('/userByID/:id', userController.getUserByID);
router.get('/userByEmail/:term', userController.getUserByEmail);
router.get('/places', userController.getPlaces);
router.post('/addUser', userController.addUser);
router.post('/addMaterialManager', userController.addMaterialManager);
router.post('/addTicketManager', userController.addTicketManager);
router.post('/addPlace', userController.addPlace);
router.put('/putPlace/:id', userController.updatePlace);
router.put('/putData/:id', userController.updateData);

router.delete('/deleteUser/:id', userController.deleteUser);
router.delete('/deletePlace/:id', userController.deletePlace);
module.exports = router;

//Moloni
router.get('/products', moloniController.getProducts);
//router.get('/tickets', moloniController.getTickets);
router.post('/addProduct', moloniController.insertProduct);
router.post('/addTicket', moloniController.insertBilhete);
router.put('/updateProduct', moloniController.updateProduct);
router.put('/confirm', moloniController.confirmAluguer);
router.delete('/deleteProduct/:id', moloniController.deleteProduct);
router.post('/stock', moloniController.insertProductStock)
router.get('/stockMovs', moloniController.getStockMovements);
router.post('/buyTicket', moloniController.comprarBilhete)
router.post('/editProduct', moloniController.editarProduto)
router.put('/updateTicket', moloniController.updateBilhete)
router.put('/devolverProduto', moloniController.devolverMaterial)
router.put('/redeem', moloniController.confirmBilhete);

//Jasmin   
router.get('/getMaterials', jasminController.getMaterials);
router.get('/getClients', jasminController.getClients);
router.get('/invoices', jasminController.getInvoices);
router.post('/addMaterial', jasminController.addMaterial);
router.post('/addClient', jasminController.addClient);
router.post('/fatura', jasminController.addInvoice);
router.post('/add', jasminController.insertClient)
// Comentário para o teste das branchs

///invoice
//router.get('/getInvoice', invoiceExpress.create)
router.post('/createContact', invoiceController.insertClients)
router.post('/createItems', invoiceController.insertItems)
router.post('/createInvoice', invoiceController.insertInvoice)
router.get('/invoices', invoiceController.getAllInvoices)
router.get('/getClientes', invoiceController.getClients)
router.get('/getItems', invoiceController.getItems)

//API METEOROLOGIA
router.get('/meteorologia', openWeather.getMeteo);

router.get('/login/:email/:pass', userController.login)

