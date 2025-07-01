# REST API

Basic CRUD API for items.

## Endpoints

- `GET /items` - get all
- `GET /items/:id` - get one  
- `POST /items` - create
- `PUT /items/:id` - update
- `DELETE /items/:id` - delete

## Run it

```bash
npm install
npm start
```

Or with docker:
```bash
./run-api.sh
```

## Test endpoints

```bash
# Get all items
curl -s http://localhost:3000/items

# Create an item
curl -s -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "test item"}'

# Get specific item
curl -s http://localhost:3000/items/1

# Update item
curl -s -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "updated test item"}'

# Delete item
curl -s -X DELETE http://localhost:3000/items/1

# Test 404 - getting non existent item
curl -s http://localhost:3000/items/999
```

Or run all tests at once:
```bash
./test-api.sh
```

## Tests

```bash
npm test
```

Or:
```bash
./run-tests.sh
```
