const mongoose = require("mongoose");

/**
 * @schema RecipeSchema
 * Defines the structure of a Recipe document in MongoDB.
 */
const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Recipe description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    ingredients: {
      type: [String],
      required: [true, "At least one ingredient is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Ingredients array must not be empty",
      },
    },

    instructions: {
      type: String,
      required: [true, "Cooking instructions are required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Recipe category is required"],
      enum: {
        values: [
          "Breakfast",
          "Lunch",
          "Dinner",
          "Snack",
          "Dessert",
          "Beverage",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },

    prepTime: {
      type: Number,
      required: [true, "Preparation time (in minutes) is required"],
      min: [1, "Prep time must be at least 1 minute"],
    },

    cookTime: {
      type: Number,
      required: [true, "Cook time (in minutes) is required"],
      min: [0, "Cook time cannot be negative"],
    },

    servings: {
      type: Number,
      required: [true, "Number of servings is required"],
      min: [1, "Servings must be at least 1"],
    },

    difficulty: {
      type: String,
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "{VALUE} is not a valid difficulty level",
      },
      default: "Easy",
    },

    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
