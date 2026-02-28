const { db } = require('../config/db');

// @desc    Get all products
exports.getProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// @desc    Get single product
exports.getProductById = async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create product (Admin)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl, category, stock } = req.body;
    const docRef = await db.collection('products').add({
      name, price: Number(price), description, imageUrl, category, stock: Number(stock),
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ id: docRef.id, name });
  } catch (error) {
    res.status(400).json({ message: 'Failed to create product' });
  }
};

// @desc    Update product (Admin)
exports.updateProduct = async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).update(req.body);
    res.json({ message: 'Product updated' });
  } catch (error) {
    res.status(400).json({ message: 'Update failed' });
  }
};

// @desc    Delete product (Admin)
exports.deleteProduct = async (req, res) => {
  try {
    await db.collection('products').doc(req.params.id).delete();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
