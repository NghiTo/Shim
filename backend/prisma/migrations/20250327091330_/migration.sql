/*
  Warnings:

  - The values [shortAnswer] on the enum `Question_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Answer` MODIFY `isCorrect` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `Question` MODIFY `type` ENUM('multipleChoice', 'trueFalse', 'fillInTheBlank', 'openEnded') NOT NULL;
