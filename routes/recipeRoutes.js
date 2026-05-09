const express = require("express");
const router = express.Router();
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

/**
 * @route   POST   /api/recipes        → createRecipe
 * @route   GET    /api/recipes        → getAllRecipes
 */
router.route("/").post(createRecipe).get(getAllRecipes);

/**
 * @route   GET    /api/recipes/:id    → getRecipeById
 * @route   PUT    /api/recipes/:id    → updateRecipe
 * @route   DELETE /api/recipes/:id   → deleteRecipe
 */
router.route("/:id").get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
