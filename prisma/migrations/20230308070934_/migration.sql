-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "expiredAt" SET DEFAULT NOW() + interval '1 month';
