CREATE TYPE "gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TYPE "user_role" AS ENUM('admin', 'member');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"role" "user_role" DEFAULT 'member'::"user_role" NOT NULL,
	"gender" "gender",
	"created_at" timestamp DEFAULT now() NOT NULL
);
