import { db } from '../firebase.js';

const ProductController = {
  // READ ALL
  getAllProducts: async (req, res) => {
    try {
      const snapshot = await db.collection('products').get();
      const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(products);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch products', details: err.message });
    }
  },

  // READ ONE
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;
  
      const snapshot = await db
        .collection('products')
        .where('id', '==', parseInt(id)) 
        .get();
  
      if (snapshot.empty) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      const product = snapshot.docs[0].data();
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch product", details: err.message });
    }
  }
  
};

export default ProductController;
