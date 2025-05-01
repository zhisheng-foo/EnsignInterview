import express from 'express';
import AccountController from '../controller/accountController.js';

const router = express.Router();

// CREATE
router.post('/', AccountController.createAccount);

// LOGIN
router.post('/login', AccountController.loginAccount);

// READ ALL
router.get('/', AccountController.getAllAccounts);

// READ ONE
router.get('/:id', AccountController.getAccountById);

// UPDATE
router.put('/:id', AccountController.updateAccount);

// DELETE
router.delete('/:id', AccountController.deleteAccount);

export default router;

