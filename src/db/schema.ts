import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['student', 'admin'] }).default('student').notNull(),
  isBanned: integer('is_banned', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const applications = sqliteTable('applications', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  company: text('company').notNull(),
  position: text('position').notNull(),
  status: text('status', { enum: ['Pending', 'Interview', 'Rejected', 'Accepted'] }).default('Pending').notNull(),
  userId: text('user_id').notNull(),
  url: text('url'),
  recruiterEmail: text('recruiter_email'),
  notes: text('notes'),
  followUpDate: integer('follow_up_date', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: text('author_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const internships = sqliteTable('internships', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  company: text('company').notNull(),
  position: text('position').notNull(),
  url: text('url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});