const express = require('express');
const router = express.Router();
const {getProductById, getProducts, deleteProduct, updateProduct, createProduct} = require('../controllers/productController');
const {protect, admin} = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware')



router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, admin, upload.array('images', 4), createProduct);
router.put('/:id', protect, admin, upload.array('images', 4), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);



module.exports = router;