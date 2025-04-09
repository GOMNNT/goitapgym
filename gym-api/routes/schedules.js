const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Lấy danh sách lịch tập
router.get('/', async (req, res) => {
  try {
    const schedules = await prisma.schedule.findMany();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách lịch tập.' });
  }
});

// Thêm lịch tập
router.post('/', async (req, res) => {
  const { title, date, time, description } = req.body;
  try {
    const schedule = await prisma.schedule.create({
      data: { title, date: new Date(date), time, description },
    });
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi thêm lịch tập.' });
  }
});

// Cập nhật lịch tập
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, date, time, description } = req.body;
  try {
    const schedule = await prisma.schedule.update({
      where: { id: parseInt(id) },
      data: { title, date: new Date(date), time, description },
    });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật lịch tập.' });
  }
});

// Xóa lịch tập
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.schedule.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa lịch tập.' });
  }
});

module.exports = router;