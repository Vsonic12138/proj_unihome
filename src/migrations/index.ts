import * as migration_20260404_084231_init from './20260404_084231_init';
import * as migration_20260404_103246 from './20260404_103246';
import * as migration_20260404_111827 from './20260404_111827';

export const migrations = [
  {
    up: migration_20260404_084231_init.up,
    down: migration_20260404_084231_init.down,
    name: '20260404_084231_init',
  },
  {
    up: migration_20260404_103246.up,
    down: migration_20260404_103246.down,
    name: '20260404_103246',
  },
  {
    up: migration_20260404_111827.up,
    down: migration_20260404_111827.down,
    name: '20260404_111827'
  },
];
