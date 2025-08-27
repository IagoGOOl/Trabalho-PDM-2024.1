-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ingredients_recipe_posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER,
    "ingredientId" INTEGER,
    CONSTRAINT "ingredients_recipe_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ingredients_recipe_posts_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ingredients_recipe_posts" ("id", "ingredientId", "postId") SELECT "id", "ingredientId", "postId" FROM "ingredients_recipe_posts";
DROP TABLE "ingredients_recipe_posts";
ALTER TABLE "new_ingredients_recipe_posts" RENAME TO "ingredients_recipe_posts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
