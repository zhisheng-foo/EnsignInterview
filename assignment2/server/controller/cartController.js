import { db } from '../firebase.js';

const CartController = {
  addToCart: async (req, res) => {
    try {
      const { accountId, productId } = req.body;
      if (!accountId || !productId) {
        return res.status(400).json({ error: 'accountId and productId are required.' });
      }

      const cartRef = db.collection('carts').doc(accountId);
      const cartDoc = await cartRef.get();

      if (!cartDoc.exists) {
        await cartRef.set({
          accountId,
          items: [{ productId, quantity: 1, addedAt: new Date().toISOString() }]
        });
      } else {
        const cartData = cartDoc.data();
        const existingItem = cartData.items.find(item => item.productId === productId);

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cartData.items.push({ productId, quantity: 1, addedAt: new Date().toISOString() });
        }

        await cartRef.update({ items: cartData.items });
      }

      return res.status(200).json({ message: 'Item added to cart.' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to add to cart', details: err.message });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { accountId, productId } = req.body;
      if (!accountId || !productId) {
        return res.status(400).json({ error: 'accountId and productId are required.' });
      }
  
      const cartRef = db.collection('carts').doc(accountId);
      const cartDoc = await cartRef.get();
  
      if (!cartDoc.exists) {
        return res.status(404).json({ error: 'Cart not found.' });
      }
  
      const cartData = cartDoc.data();
      const items = cartData.items || [];
      const index = items.findIndex(item => item.productId === Number(productId));
  
      if (index === -1) {
        return res.status(404).json({ error: 'Item not found in cart.' });
      }
  
      if (items[index].quantity > 1) {
        items[index].quantity -= 1;
      } else {
        items.splice(index, 1);
      }
  
      await cartRef.update({ items });
  
      return res.status(200).json({ message: 'Item updated in cart.' });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to update cart', details: err.message });
    }
  },

  getCartByAccountId: async (req, res) => {
    try {
      const { accountId } = req.params;
  
      if (!accountId) {
        return res.status(400).json({ error: 'accountId is required.' });
      }
  
      const cartRef = db.collection('carts').doc(accountId);
      const cartDoc = await cartRef.get();
  
      if (!cartDoc.exists) {
        return res.status(404).json({ error: 'Cart not found.' });
      }
  
      const cartData = cartDoc.data();
      return res.status(200).json(cartData);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to retrieve cart', details: err.message });
    }
  },
};

export default CartController;
