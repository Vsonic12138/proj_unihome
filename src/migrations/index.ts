import * as migration_20260404_084231_init from './20260404_084231_init';
import * as migration_20260404_103246 from './20260404_103246';
import * as migration_20260404_111827 from './20260404_111827';
import * as migration_20260421_173200_site_settings_compliance from './20260421_173200_site_settings_compliance';
import * as migration_20260422_055512 from './20260422_055512';

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
    name: '20260404_111827',
  },
  {
    up: migration_20260421_173200_site_settings_compliance.up,
    down: migration_20260421_173200_site_settings_compliance.down,
    name: '20260421_173200_site_settings_compliance',
  },
  {
    up: migration_20260422_055512.up,
    down: migration_20260422_055512.down,
    name: '20260422_055512'
  },
];
