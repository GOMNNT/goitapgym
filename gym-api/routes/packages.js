const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

// Lấy danh sách gói tập
router.get('/', async (req, res) => {
  try {
    const packages = await prisma.package.findMany();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm gói tập mới
router.post('/', async (req, res) => {
  const { name, price, duration, description } = req.body;
  try {
    const pkg = await prisma.package.create({
      data: {
        name,
        price: parseFloat(price),
        duration,
        description,
      },
    });
    res.status(201).json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật gói tập
router.put('/:id', async (req, res) => {
  const { name, price, duration, description } = req.body;
  try {
    const pkg = await prisma.package.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        price: parseFloat(price),
        duration,
        description,
      },
    });
    res.json(pkg);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa gói tập
router.delete('/:id', async (req, res) => {
  try {
    await prisma.package.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Gói tập đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;