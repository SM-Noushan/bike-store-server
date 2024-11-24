Here’s the updated and refined `README.md`, with a generic folder structure and no duplicates:

````markdown
# Bike Store Management API

An Express-based application built with TypeScript for managing a Bike Store, integrated with MongoDB using Mongoose. This application provides APIs to manage products (bikes) and orders with robust schema validation and error handling.

## Features

- **Product Management**:

  - Create, Read, Update, and Delete (CRUD) operations for products.
  - Product details include `name`, `brand`, `price`, `category`, `description`, `quantity`, and `inStock`.

- **Order Management**:

  - CRUD operations for orders.
  - Automatically calculate the total price (`product price * order quantity`).
  - Validate product availability before and after placing an order.

- **Data Integrity**:

  - Ensured using Mongoose schema and Zod validation.
  - Enum validation for `category` in products.

- **Error Handling**:
  - Generic error response format:
    ```json
    {
      "message": "A brief error message explaining what went wrong",
      "success": false,
      "error": "Detailed error object or message",
      "stack": "Error stack trace (for development mode)"
    }
    ```

---

## Project Setup

### Prerequisites

- Node.js (v16+)
- MongoDB
- TypeScript

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sm-noushan/bike-store-server.git
   cd bike-store-server
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file from `.env.example` and set the necessary environment variables.

4. Start the development server:

   ```bash
   npm run start:dev
   ```

5. Access the API at `http://localhost:6009`.

---

## API Endpoints

### Products

| Method | Endpoint                        | Description       |
| ------ | ------------------------------- | ----------------- |
| GET    | `/api/products?searchTerm=name` | Get all products  |
| GET    | `/api/products/:productId`      | Get product by ID |
| POST   | `/api/products`                 | Add a new product |
| PUT    | `/api/products/:productId`      | Update product    |
| DELETE | `/api/products/:productId`      | Delete a product  |

#### Product Example Payload:

```json
{
  "name": "Product Name",
  "brand": "Brand Name",
  "price": 500,
  "category": "Category",
  "description": "Product description here.",
  "quantity": 10,
  "inStock": true
}
```

### Orders

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | `/api/orders`         | Place a new order       |
| GET    | `/api/orders/revenue` | Calculate total revenue |

#### Order Example Payload:

```json
{
  "email": "customer@example.com",
  "product": "64f83b2d5e12b5c88b8c8d3c",
  "quantity": 2,
  "totalPrice": 1000
}
```

---

## Project Structure

```
project/
├── node_modules/          # Installed dependencies
├── src/                   # Source code directory
│   ├── app/
│   │   ├── config/        # Configuration files
│   │   │   └── index.ts   # Main configuration setup
│   ├── modules/           # Feature-based modules
│   │   ├── <module_name>/ # Generic module folder (e.g., product, order)
│   │   │   ├── controller.ts  # Handles request and response logic
│   │   │   ├── interface.ts   # TypeScript interfaces
│   │   │   ├── model.ts       # Database schema and model
│   │   │   ├── routes.ts      # API routes for the module
│   │   │   ├── service.ts     # Business logic and service layer
│   │   │   └── validation.ts  # Validation logic for inputs
│   ├── app.ts             # App initialization and configuration
│   └── server.ts          # Server entry point
├── .env                   # Environment variables file
├── .env.example           # Example environment variables file
├── .gitignore             # Ignored files for Git
├── .prettierrc            # Prettier configuration
├── eslint.config.mjs      # ESLint configuration
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Lock file for package versions
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project details and instructions
```

---

## Scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run start:dev`    | Start the development server with automatic reload |
| `npm run build`        | Build the project for production                   |
| `npm run start:prod`   | Start the production server using the built files  |
| `npm run lint`         | Run ESLint to check for code quality issues        |
| `npm run lint:fix`     | Run ESLint and fix issues automatically            |
| `npm run prettier`     | Format the codebase using Prettier                 |
| `npm run prettier:fix` | Format and fix code style issues with Prettier     |

---

## Future Improvements

- Add authentication and authorization for API endpoints.
- Implement filtering and sorting for product and order listings.
- Add pagination for large datasets.
- Enhance test coverage with unit and integration tests.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Add feature description"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.
