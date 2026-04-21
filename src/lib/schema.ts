import { pgTable, serial, varchar, timestamp, foreignKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const fullnames = pgTable('fullname', {
  id: serial('id').primaryKey(),
  fullname: varchar('fullname', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export const nicknames = pgTable('nickname', {
  id: serial('id').primaryKey(),
  fullname_id: serial('fullname_id')
    .references(() => fullnames.id)
    .notNull(),
  nickname: varchar('nickname', { length: 255 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Relations (optional but useful)
export const fullnameRelations = relations(fullnames, ({ many }) => ({
  nicknames: many(nicknames),
}));

export const nicknameRelations = relations(nicknames, ({ one }) => ({
  fullname: one(fullnames, {
    fields: [nicknames.fullname_id],
    references: [fullnames.id],
  }),
}));
