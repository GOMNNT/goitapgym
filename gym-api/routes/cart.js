const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

// Lấy danh sách giỏ hàng của một khách hàng
router.get('/:customerId', async (req, res) => {
  try {
    const carts = await prisma.cart.findMany({
      where: { customerId: parseInt(req.params.customerId) },
      include: { package: true, customer: true },
    });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm gói tập vào giỏ hàng
router.post('/', async (req, res) => {
  const { customerId, packageId } = req.body;
  try {
    const cart = await prisma.cart.create({
      data: {
        customerId: parseInt(customerId),
        packageId: parseInt(packageId),
      },
      include: { package: true, customer: true },
    });
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa mục khỏi giỏ hàng
router.delete('/:id', async (req, res) => {
  try {
    await prisma.cart.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Cart item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;