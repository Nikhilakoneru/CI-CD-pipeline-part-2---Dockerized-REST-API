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

## Tests

```bash
npm test
```

Or:
```bash
./run-tests.sh
```