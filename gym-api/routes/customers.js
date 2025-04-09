const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');

// Lấy danh sách khách hàng
router.get('/', async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      include: { package: true },
    });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm khách hàng mới
router.post('/', async (req, res) => {
  const { name, email, phone, packageId } = req.body;
  try {
    // Lấy thông tin gói tập để tính startDate và endDate
    const pkg = await prisma.package.findUnique({
      where: { id: parseInt(packageId) },
    });

    if (!pkg) {
      return res.status(404).json({ message: 'Gói tập không tồn tại' });
    }

    const startDate = new Date();
    const endDate = new Date(startDate);
    if (pkg.duration === '1 month') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (pkg.duration === '6 months') {
      endDate.setMonth(endDate.getMonth() + 6);
    } else if (pkg.duration === '1 year') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        packageId: parseInt(packageId),
        startDate,
        endDate,
        status: 'pending', // Mặc định trạng thái là "pending"
      },
      include: { package: true },
    });
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật khách hàng
// Cập nhật khách hàng
router.put('/:id', async (req, res) => {
    const { name, email, phone, packageId, status } = req.body; // Đảm bảo nhận status
    try {
      const customer = await prisma.customer.update({
        where: { id: parseInt(req.params.id) },
        data: {
          name,
          email,
          phone,
          packageId: packageId ? parseInt(packageId) : null,
          status, // Cập nhật trạng thái
        },
        include: { package: true },
      });
      res.json(customer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Cập nhật trạng thái thanh toán
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const customer = await prisma.customer.update({
      where: { id: parseInt(req.params.id) },
      data: { status },
      include: { package: true },
    });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa khách hàng
router.delete('/:id', async (req, res) => {
  try {
    await prisma.customer.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: 'Khách hàng đã được xóa' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;