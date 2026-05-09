const Recipe = require("../models/Recipe");

// ─────────────────────────────────────────────
//  Helper: format Mongoose validation errors
// ─────────────────────────────────────────────
const formatValidationErrors = (err) => {
  return Object.values(err.errors).map((e) => e.message);
};

// ─────────────────────────────────────────────
//  @desc    Create a new recipe
//  @route   POST /api/recipes
//  @access  Public
// ─────────────────────────────────────────────
const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: recipe,
    });
  } catch (error) {
    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatValidationErrors(error),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while creating recipe",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  @desc    Retrieve all recipes (with optional filters)
//  @route   GET /api/recipes
//  @access  Public
// ─────────────────────────────────────────────
const getAllRecipes = async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;

    // Build a dynamic query object
    const query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.title = { $regex: search, $options: "i" };

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching recipes",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  @desc    Retrieve a single recipe by ID
//  @route   GET /api/recipes/:id
//  @access  Public
// ─────────────────────────────────────────────
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    // Invalid ObjectId format
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while fetching recipe",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  @desc    Update a recipe by ID
//  @route   PUT /api/recipes/:id
//  @access  Public
// ─────────────────────────────────────────────
const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,           // Return the updated document
        runValidators: true, // Re-run schema validators on update
      }
    );

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      data: recipe,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formatValidationErrors(error),
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating recipe",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────
//  @desc    Delete a recipe by ID
//  @route   DELETE /api/recipes/:id
//  @access  Public
// ─────────────────────────────────────────────
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
      data: {},
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid recipe ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while deleting recipe",
      error: error.message,
    });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
