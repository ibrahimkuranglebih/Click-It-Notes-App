-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "deskripsi" VARCHAR(255) NOT NULL,
    "tanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
