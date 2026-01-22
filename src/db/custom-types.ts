import { customType } from 'drizzle-orm/sqlite-core';

export const date = customType<{ data: Date; driverData: string }>({
  dataType() {
    return 'text';
  },
  toDriver(value: Date): string {
    return value.toISOString();
  },
  fromDriver(value: string): Date {
    return new Date(value);
  },
});
