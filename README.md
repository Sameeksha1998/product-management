# Product Management App

A simple React-based product management application with user and admin roles that allows for CRUD operations on products. Admins can manage the inventory, add, edit, and delete products, while regular users can only view the products, filter, and sort them. The application utilizes **React**, **Redux**, **Material-UI**, **React Router**, **localStorage**, and **role-based authentication**.

## Features

### User Roles:
- **Admin**:
  - Full access to all CRUD operations (Create, Read, Update, Delete) for products.
  - Can manage inventory and view basic analytics.
  - Can view sales analytics for demo data
  
- **Regular User**:
  - Can only view, filter, and sort products.
  - Cannot add, edit, or delete products.

### Core Functionality:
- **Authentication and Authorization**:
  - Login and Logout functionality with role-based access control.
  - Protected routes for admin-only actions.
  
- **Product Management (Admin Only)**:
  - Add new products with fields like name, price, category, stock quantity, description, etc.
  - Edit existing products.
  - Delete products from the inventory.
  
- **Product Viewing** (Available for both Admin and User):
  - View products in a grid or table layout.
  - Sort products by price.
  - Filter products by name.
  - View product details.
  - Alert for out of stock products
  
 **Inventory Viewing** (Available for oly Admin):
  - View products in a grid or table layout.
  - Manage Stock and price 
  - Badges for less then 5 stock products

- **State Management**:
  - Uses Redux for managing state, including authentication state and product data.
  - All data is stored in **localStorage** to persist across sessions.

- **Responsive Design**:
  - Fully responsive design using Material-UI's Grid system for different screen sizes.

## Technologies Used
- **React** - Frontend framework for building the UI.
- **Redux** - For global state management.
- **React Router** - For routing and navigation.
- **Material-UI** - For the UI components and design.
- **localStorage** - For persisting authentication and product data across sessions.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Sameeksha1998/product-management.git
cd product-management-app
npm start
