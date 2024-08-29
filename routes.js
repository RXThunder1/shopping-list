const express = require('express')
const router = express.Router()
const items = require('./fakeDb')

// GET /items - Get all items
router.get('/', (req, res) => {
  res.json(items)
})

// POST /items - Add a new item
router.post('/', (req, res) => {
  const { name, price } = req.body
  const newItem = { name, price }
  items.push(newItem)
  res.json({ added: newItem })
})

// GET /items/:name - Get an item by name
router.get('/:name', (req, res) => {
  const item = items.find(i => i.name === req.params.name)
  if (item) {
    res.json(item)
  } else {
    res.status(404).json({ error: 'Item not found' })
  }
})

// PATCH /items/:name - Update an item by name
router.patch('/:name', (req, res) => {
  const index = items.findIndex(i => i.name === req.params.name)
  if (index !== -1) {
    const { name, price } = req.body
    const updatedItem = { name, price }
    items[index] = updatedItem
    res.json({ updated: updatedItem })
  } else {
    res.status(404).json({ error: 'Item not found' })
  }
})

// DELETE /items/:name - Delete an item by name
router.delete('/:name', (req, res) => {
  const index = items.findIndex(i => i.name === req.params.name)
  if (index !== -1) {
    items.splice(index, 1)
    res.json({ message: 'Deleted' })
  } else {
    res.status(404).json({ error: 'Item not found' })
  }
})

module.exports = router