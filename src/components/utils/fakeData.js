export const STORAGE_KEY = "products";

// Initialize with dummy data if not present
// const initializeStorage = () => {
//   if (!localStorage.getItem(STORAGE_KEY)) {
//     const dummyData = [
//       {
//         id: "1",
//         name: "Laptop",
//         price: 1200,
//         category: "Electronics",
//         description: "A high-end gaming laptop",
//         stockQuantity: 10,
//         createdBy: "Admin",
//         lastModified: new Date().toISOString(),
//       },
//       {
//         id: "2",
//         name: "Smartphone",
//         price: 800,
//         category: "Electronics",
//         description: "Latest model with high performance",
//         stockQuantity: 15,
//         createdBy: "Admin",
//         lastModified: new Date().toISOString(),
//       }
//     ];
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
//   }
// };

// Fetch all products
export const getProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      resolve(data);
    }, 500);
  });
};

// Add a product
export const addProduct = async (product) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      product.id = Date.now().toString(); // Generate unique ID as string
      product.lastModified = new Date().toISOString();
      data.push(product);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      resolve(product);
    }, 500);
  });
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; // Retrieve data or initialize as empty array

    console.log("Initial Data:", data); // Log before filtering

    // Filter out the product with the given ID
    data = data.filter((item) => item.id !== id);

    console.log("Updated Data:", data); // Log after filtering

    // Save the updated data back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    return id; // Resolve with the deleted product's ID
  } catch (error) {
    console.error("Error deleting product:", error); // Catch and log any errors
    throw error; // Throw the error so it can be handled elsewhere if needed
  }
};



// update a product
export const updateProduct = async (product) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      const index = data.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        data[index] = { ...data[index], ...product }; // Merge updates
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        resolve(data[index]); // Return the updated product
      } else {
        reject(new Error("Product not found"));
      }
    }, 500);
  });
};


// initializeStorage(); // Run on app start