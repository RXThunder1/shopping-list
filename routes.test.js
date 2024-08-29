const request = require('supertest')
const app = require('../server')

describe('Shopping List API', () => {
  beforeEach(() => {
    global.items.length = 0 // Clear items before each test
  })

  test('GET /items returns an empty array initially', async () => {
    const response = await request(app).get('/items')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })

  test('POST /items adds a new item', async () => {
    const newItem = { name: 'popsicle', price: 1.45 }
    const response = await request(app).post('/items').send(newItem)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ added: newItem })
    expect(global.items).toContainEqual(newItem)
  })

  test('GET /items/:name returns a single item', async () => {
    const newItem = { name: 'popsicle', price: 1.45 }
    global.items.push(newItem)
    const response = await request(app).get('/items/popsicle')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(newItem)
  })

  test('PATCH /items/:name updates an item', async () => {
    const originalItem = { name: 'popsicle', price: 1.45 }
    const updatedItem = { name: 'new popsicle', price: 2.45 }
    global.items.push(originalItem)
    const response = await request(app).patch('/items/popsicle').send(updatedItem)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ updated: updatedItem })
    expect(global.items).toContainEqual(updatedItem)
  })

  test('DELETE /items/:name removes an item', async () => {
    const newItem = { name: 'popsicle', price: 1.45 }
    global.items.push(newItem)
    const response = await request(app).delete('/items/popsicle')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ message: 'Deleted' })
    expect(global.items).not.toContainEqual(newItem)
  })
})