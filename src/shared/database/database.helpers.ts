import { eq } from 'drizzle-orm';
import type {
  PgTableWithColumns,
  TableConfig,
} from 'drizzle-orm/pg-core';

import { db } from '../../config/db.js';

type TableWithId<T extends TableConfig> =
  PgTableWithColumns<T> & {
    id: PgTableWithColumns<T>['id'];
  };

export const findById = async <T extends TableConfig>(
  model: TableWithId<T>,
  id: string,
) => {
  const records = await db
    .select()
    .from(model)
    .where(eq(model.id, id));

  return records.at(0) ?? null;
};

export const findAll = async <T extends TableConfig>(
  model: PgTableWithColumns<T>,
) => {
  return db.select().from(model);
};