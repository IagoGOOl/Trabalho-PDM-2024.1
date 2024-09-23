/*
  Warnings:

  - You are about to drop the column `nome_instituicao` on the `instituicao` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `instituicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `instituicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `instituicao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "instituicao_id" INTEGER,
    CONSTRAINT "user_instituicao_id_fkey" FOREIGN KEY ("instituicao_id") REFERENCES "instituicao" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE TABLE "new_instituicao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL
);
INSERT INTO "new_instituicao" ("id") SELECT "id" FROM "instituicao";
DROP TABLE "instituicao";
ALTER TABLE "new_instituicao" RENAME TO "instituicao";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
