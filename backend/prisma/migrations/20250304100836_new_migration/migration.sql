-- CreateEnum
CREATE TYPE "Type" AS ENUM ('work', 'study', 'event', 'task', 'others');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('unfinished', 'finished');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "taskStatus" "Status" NOT NULL DEFAULT 'unfinished',
ADD COLUMN     "taskType" "Type" NOT NULL DEFAULT 'others';
