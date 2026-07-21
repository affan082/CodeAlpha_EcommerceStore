const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  { name: 'Slim Fit Chino Pants', description: 'Comfortable slim-fit chinos for everyday wear.', price: 1499, category: 'Pants', stock: 40, images: [] },
  { name: 'Classic Denim Jeans', description: 'Regular fit stonewashed denim.', price: 1999, category: 'Pants', stock: 35, images: [] },
  { name: 'Cargo Pants', description: 'Utility cargo pants with multiple pockets.', price: 1799, category: 'Pants', stock: 25, images: [] },
  { name: 'Crew Neck Basic Tee', description: 'Soft cotton crew neck t-shirt.', price: 599, category: 'T-Shirts', stock: 60, images: [] },
  { name: 'Graphic Print Tee', description: 'Trendy graphic printed t-shirt.', price: 799, category: 'T-Shirts', stock: 50, images: [] },
  { name: 'V-Neck T-Shirt', description: 'Breathable v-neck cotton tee.', price: 649, category: 'T-Shirts', stock: 45, images: [] },
  { name: 'Oxford Casual Shirt', description: 'Classic oxford weave casual shirt.', price: 1299, category: 'Casual Shirts', stock: 30, images: [] },
  { name: 'Checked Flannel Shirt', description: 'Warm checked flannel casual shirt.', price: 1399, category: 'Casual Shirts', stock: 20, images: [] },
  { name: 'Linen Short Sleeve Shirt', description: 'Lightweight linen shirt for summer.', price: 1199, category: 'Casual Shirts', stock: 28, images: [] },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();