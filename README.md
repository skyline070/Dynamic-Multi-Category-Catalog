📦 Dynamic Multi-Category Catalog

A responsive and dynamic product catalog web application built using React (Vite).

The app displays multiple categories and items with fully dynamic rendering, supporting advanced features like search, filtering, pagination, infinite scroll, and favorites management.

🚀 Live Demo

👉 dynamic-multi-category-catalog-lake.vercel.app

📌 Features

🏠 Home Page

 - Displays multiple categories dynamically (Cars, Phones, Bikes, Computers, etc.)
 - Items grouped automatically by category
 - Clean and responsive grid layout

🔍 Search & Filter

 - Real-time search with debounce optimization
 - Category-based filtering
 - Combined filtering (search + category)

📄 Pagination & Infinite Scroll

 - Toggle between pagination and infinite scroll
 - Optimized rendering for performance
 - Smooth UX handling large datasets

❤️ Favorites System

 - Add / remove items from favorites
 - Persistent state using localStorage
 - Dedicated Favorites page

📱 Item Details Page

 - Fully dynamic rendering using itemprops
 - No hardcoded fields (works for any category)
 - Displays image, name, category, and all attributes dynamically

⚠️ Error Handling & UX

 - API / data error handling with retry option
 - Loading skeleton UI for better UX
 - Empty state handling
 - Image fallback support

🛠️ Tech Stack
- Frontend: React (Vite)
- Routing: React Router DOM
- Styling: Tailwind CSS
- State Management: React Hooks
- Notifications: react-hot-toast
- Data Source: JSON / Mock API

📂 Folder Structure

src/
 
 ├── components/
 
│           ├── CategorySection.jsx
 
│           ├── ItemCard.jsx
 
│           ├── SkeletonCard.jsx
 
│           ├── Navbar.jsx
 
├── pages/
 
│           ├── Home.jsx
 
│           ├── Details.jsx
 
│           ├── Favorites.jsx
 
├── data/
 
│           ├── data.json
 
├── App.jsx
 
├── main.jsx



⚙️ Installation & Setup

## Clone the repository
git clone https://github.com/your-username/catalog-app.git

## Navigate to project
cd catalog-app

## Install dependencies
npm install

## Run development server
npm run dev

🧠 Approach

- Parsed JSON data and dynamically grouped items by category
- Built reusable components for scalability and clean architecture
- Implemented debounce logic for optimized search performance
- Applied pagination before grouping for correct slicing behavior
- Designed fully responsive UI using Tailwind CSS
- Managed favorites using localStorage for persistence across sessions
- Ensured fully dynamic rendering in details page using itemprops

⏱️ Time Taken

~6–8 hours

⭐ Key Highlights
 - Fully dynamic rendering (zero hardcoded fields)
 - Scalable and reusable component architecture
 - Optimized performance (debounce + pagination + memo-friendly structure)
 - Production-level UI/UX design
 - Handles edge cases (loading, error, empty state, fallback images)

📈 Future Improvements
 - Backend integration (Node.js + Express)
 - Authentication system (login/signup)
 - Wishlist sync across devices
 - Advanced filters (price, rating, sorting)
 - Backend-driven categories & products

👨‍💻 Author

 Sumit Kumar
 Frontend Developer

📬 Feedback

Feel free to reach out or suggest improvements. Always open to feedback and collaboration.
