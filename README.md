# 🍽️ Recipes App — CRUD API

A complete RESTful CRUD API for managing recipes built with **Node.js**, **Express.js**, and **Mongoose (MongoDB)**, following the **MVC pattern**.

---

## 📁 Project Structure

```
recipes-app/
├── config/
│   └── db.js                          # MongoDB connection setup
├── controllers/
│   └── recipeController.js            # CRUD logic (MVC — Controller)
├── middleware/
│   └── errorMiddleware.js             # Global error & 404 handler
├── models/
│   └── Recipe.js                      # Mongoose schema (MVC — Model)
├── routes/
│   └── recipeRoutes.js                # Express route definitions
├── .env.example                       # Environment variable template
├── .gitignore
├── package.json
├── RecipesApp.postman_collection.json # Postman API collection
├── README.md
└── server.js                          # App entry point
```

> **Note:** No `views/` folder is needed since this is a REST API (JSON responses only).

---

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework & routing |
| Mongoose | MongoDB ODM |
| MongoDB Atlas | Cloud database |
| dotenv | Environment variable management |
| cors | Cross-Origin Resource Sharing |
| nodemon | Dev auto-restart (dev only) |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Postman](https://www.postman.com/) for API testing

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/recipes-app.git
cd recipes-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/recipesdb
PORT=5000
NODE_ENV=development
```

### 4. Run the server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```
Server will start at `http://localhost:5000`

---

## 📡 API Endpoints

**Base URL:** `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/recipes` | Create a new recipe |
| GET | `/api/recipes` | Get all recipes |
| GET | `/api/recipes/:id` | Get a recipe by ID |
| PUT | `/api/recipes/:id` | Update a recipe by ID |
| DELETE | `/api/recipes/:id` | Delete a recipe by ID |

### Query Parameters for GET /api/recipes
| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category (e.g. `Dinner`) |
| `difficulty` | string | Filter by difficulty (`Easy`, `Medium`, `Hard`) |
| `search` | string | Search by title keyword (case-insensitive) |

---

## 📋 Recipe Schema

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `title` | String | ✅ | Max 100 chars |
| `description` | String | ✅ | Max 500 chars |
| `ingredients` | [String] | ✅ | Min 1 item |
| `instructions` | String | ✅ | — |
| `category` | String | ✅ | Breakfast / Lunch / Dinner / Snack / Dessert / Beverage / Other |
| `prepTime` | Number | ✅ | Minutes, min 1 |
| `cookTime` | Number | ✅ | Minutes, min 0 |
| `servings` | Number | ✅ | Min 1 |
| `difficulty` | String | ❌ | Easy / Medium / Hard (default: Easy) |
| `imageUrl` | String | ❌ | URL string |
| `createdAt` | Date | auto | Auto-generated |
| `updatedAt` | Date | auto | Auto-generated |

---

## 🧪 Sample Requests & Responses

### POST /api/recipes
**Request body:**
```json
{
  "title": "Classic Spaghetti Carbonara",
  "description": "A rich and creamy Italian pasta dish.",
  "ingredients": ["400g spaghetti", "200g pancetta", "4 eggs", "100g Pecorino"],
  "instructions": "1. Boil pasta. 2. Fry pancetta. 3. Mix eggs with cheese. 4. Combine all off heat.",
  "category": "Dinner",
  "prepTime": 10,
  "cookTime": 20,
  "servings": 4,
  "difficulty": "Medium"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": { "_id": "665a1b2c...", "title": "Classic Spaghetti Carbonara", ... }
}
```

### GET /api/recipes
**Response (200):**
```json
{
  "success": true,
  "count": 1,
  "data": [ { "_id": "665a1b2c...", "title": "Classic Spaghetti Carbonara", ... } ]
}
```

### DELETE /api/recipes/:id
**Response (200):**
```json
{ "success": true, "message": "Recipe deleted successfully", "data": {} }
```

---

## 🔴 Error Responses

| Code | Meaning |
|------|---------|
| 400 | Bad Request — validation error or invalid ID |
| 404 | Not Found — recipe doesn't exist |
| 500 | Server Error — unexpected failure |

```json
{
  "success": false,
  "message": "Recipe not found with ID: 665a1b2c..."
}
```

---

## 📬 Postman Collection

Import `RecipesApp.postman_collection.json` into Postman:
1. Open Postman → **Import** → select the JSON file
2. Set the `baseUrl` variable to `http://localhost:5000` (local) or your Render URL
3. After creating a recipe, copy the `_id` into the `recipeId` variable
4. All 5 CRUD endpoints are pre-configured with sample data

---

## ☁️ Deployment on Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `MONGODB_URI` → your MongoDB Atlas connection string
   - `NODE_ENV` → `production`
6. Click **Deploy** — Render provides a live URL

> 💡 **MongoDB Atlas tip:** In Network Access, add `0.0.0.0/0` to allow connections from Render's dynamic IPs.

---

## 📄 License

ISC
