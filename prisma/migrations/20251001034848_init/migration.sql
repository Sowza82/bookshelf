-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "readingStatus" TEXT NOT NULL DEFAULT 'UNREAD',
    "currentPage" INTEGER NOT NULL DEFAULT 0,
    "totalPages" INTEGER NOT NULL DEFAULT 350,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "genre" TEXT,
    "coverUrl" TEXT,
    "synopsis" TEXT,
    "isbn" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Book" ("author", "coverUrl", "createdAt", "currentPage", "genre", "id", "isbn", "notes", "rating", "readingStatus", "synopsis", "title", "totalPages", "updatedAt") SELECT "author", "coverUrl", "createdAt", "currentPage", "genre", "id", "isbn", "notes", "rating", "readingStatus", "synopsis", "title", coalesce("totalPages", 350) AS "totalPages", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
