-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
