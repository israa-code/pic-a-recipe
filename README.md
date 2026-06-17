<div align="center">

#  🍽️ Pic-a-Recipe 📷

### Pic-a-Recipe is a full-stack web app that uses AI-powered image recognition to turn ingredient images into personalized recipe ideas.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Clarifai](https://img.shields.io/badge/Clarifai-AI%20Vision-1955FF?style=for-the-badge)](https://clarifai.com/)
[![Spoonacular](https://img.shields.io/badge/Spoonacular-Recipe%20API-green?style=for-the-badge)](https://spoonacular.com/food-api)


</div>

---

## About 

**Pic-a-Recipe** is a full-stack web application built to help individuals discover recipes from the ingredients they have at home. The application is designed to minimize the search and mental load of deciding on a meal. This is accomplished using Clarifai’s AI-powered food-image recognition model to identify food ingredients from a photo URL. The application then provides personalized recipe suggestions based on the identified food ingredients via the Spoonacular API

---

## 🎬 Demo

### Paste an image URL & detect/edit ingredients
<img width="600" height=auto alt="Image Link" src="https://github.com/user-attachments/assets/bd0750af-75d6-452f-992e-f99a595e8267" />

### Generate recipes from your ingredients
<img width="600" height=auto alt="Create Recipe" src="https://github.com/user-attachments/assets/9db1ab71-b0af-4357-bc83-138315cf0737" />

---
## How It Works

1.	The user pastes a food image they want to turn into a recipe via URL

2.  The image URL is sent from the React frontend to the Express backend, where it is processed securely

3.  The backend uses Clarifai's Food Recognition model to analyze the image and identify possible ingredients

4.	Detected ingredients with a confidence score above 2% are returned and displayed to the user

5.	Users can review, add, or remove ingredients to customize what they want to cook with
   
6. The user clicks "Create Recipes," which sends the updated ingredient list to Spoonacular using REST API query parameters. Recipes are returned based on how well they match the available ingredients.
  
7.	An additional fetch request is sent to Spoonacular using the recipe ID to retrieve detailed information, including nutrition, cooking instructions, preparation time, and servings.

8.	Finally, the user browses the recipes that are displayed in an animated flip-book 



---
## Features

- AI ingredient detection in any food image via URL
- Ingredient list editor to add or remove ingredients before searching for recipes
- Recipe matching based on ingredients
- An interactive recipe book that displays the recipes in an animated page-flip book
- Express backend proxy for handling Clarifai API requests securely

---

## Built With

### Frontend
- [React 19](https://react.dev/) — Built the interactive user interface and managed application state
- [Vite 6](https://vitejs.dev/) — Used as the frontend build tool and development environment
- [React Router DOM v7](https://reactrouter.com/) — Handled navigation between application pages 
- [react-pageflip](https://nodlik.github.io/react-pageflip/) — Created the interactive recipe book 
- [Tachyons](https://tachyons.io/) — Provided utility classes for styling and responsive layouts

### Backend
- [Node.js + Express 5](https://expressjs.com/) — Built the backend server and handled API requests
- [Clarifai API](https://clarifai.com/) — Used AI-powered image recognition to identify ingredients from food images
- [Spoonacular API](https://spoonacular.com/food-api) — Used to find recipes and retrieve additional recipe details

---
## Future Improvements

- Redesign the recipe display for a more responsive browsing experience and improve recipe skimming
- Evolve the backend to include database integration, allowing users to save and manage recipes
- Implement mobile support with direct camera uploads for a more convenient user experience
