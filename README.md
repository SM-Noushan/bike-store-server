# Bike Store Management API

**BikeStore** is a robust and user-friendly bike shop platform that delivers seamless experiences for both customers and administrators. It features secure authentication, smooth product and order management, responsive design, and integrated payment processing via Stripe. The system supports real-time updates using Stripe WebHooks to sync payment data directly into the database, ensuring reliable and up-to-date order tracking.

## Overview

- **Features**:

  - Secure user authentication and session management.
  - Full product and order CRUD with validations.
  - Stripe-ready payment layer.
  - Stripe WebHook integration for payment data synchronization.
  - Error-handling middleware with consistent API responses.
  - Pagination support for large datasets.

- **MongoDB Schemas**:

  - **Users**: Includes roles (customer, admin), authentication details.
  - **Products**: Stores all relevant bike details.
  - **Orders**: Contains product, user, status, and payment info.

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

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create an `.env` file from `.env.example` and set the necessary environment variables.

4. Start the development server:

   ```bash
   npm run start:dev
   ```

5. Access the API at `http://localhost:3000`.

---

## Future Improvements

- Real-time order status (Pending → Processing → Shipped → Delivered).
- Modify order status and expected delivery date via dropdown in the dashboard.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m "Add feature description"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.
