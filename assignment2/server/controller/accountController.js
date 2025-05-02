import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


const AccountController = {
  // CREATE
  createAccount: async (req, res) => {
    try {
      const { email, username, password } = req.body;
  
      if (!email || !username || !password) {
        return res.status(400).json({ error: "Missing fields: email, username, password are required." });
      }
  
      const existingUser = await db.collection('accounts').where('email', '==', email).get();
      if (!existingUser.empty) {
        return res.status(400).json({ error: "Email already exists." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const accountId = uuidv4();
  
      const newAccount = {
        accountId,
        email,
        username,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };
  
      await db.collection('accounts').doc(accountId).set(newAccount);
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      await transporter.sendMail({
        from: '"Shoplify" <no-reply@shoplify.com>',
        to: email,
        subject: 'Welcome to Shoplify!',
        html: ` <p>Welcome aboard, <strong>{{username}}</strong>!</p>
                <p>We're excited to have you as part of the Shoplify family. Your account has been successfully created.</p>
                <p>Feel free to explore our curated collections, exclusive deals, and personalized recommendations — all tailored just for you.</p>
                <p>If you ever need help, we're just one message away!</p>
                <p>Happy shopping and see you inside!</p>
                <p style="margin-top: 1rem;">Warm regards,<br><strong>The Shoplify Team</strong></p>`,
      });
  
      return res.status(201).json(newAccount);
    } catch (err) {
      return res.status(500).json({ error: "Failed to create account", details: err.message });
    }
  },

    loginAccount: async (req, res) => {
      try {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({ error: 'Email and password are required.' });
        }
    
        const snapshot = await db.collection('accounts').where('email', '==', email).get();
    
        if (snapshot.empty) {
          return res.status(404).json({ error: 'Account not found.' });
        }
    
        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();
    
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid password.' });
        }
    
        return res.status(200).json({
          message: 'Login successful',
          accountId: userData.accountId,
          username: userData.username,
          email: userData.email
        });
      } catch (err) {
        return res.status(500).json({ error: 'Server error', details: err.message });
      }
    },
  
  

  // READ ALL
  getAllAccounts: async (req, res) => {
    try {
      const snapshot = await db.collection('accounts').get();
      const accounts = snapshot.docs.map(doc => doc.data());
      return res.status(200).json(accounts);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch accounts", details: err.message });
    }
  },

  // READ ONE
  getAccountById: async (req, res) => {
    try {
      const { id } = req.params;
      const docRef = db.collection('accounts').doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return res.status(404).json({ error: "Account not found" });
      }

      return res.status(200).json(docSnap.data());
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch account", details: err.message });
    }
  },

  // UPDATE
  updateAccount: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }

      const docRef = db.collection('accounts').doc(id);
      await docRef.update(updates);

      return res.status(200).json({ message: "Account updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to update account", details: err.message });
    }
  },

  // DELETE
  deleteAccount: async (req, res) => {
    try {
      const { id } = req.params;
      const docRef = db.collection('accounts').doc(id);
      await docRef.delete();

      return res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete account", details: err.message });
    }
  },
};

export default AccountController;
