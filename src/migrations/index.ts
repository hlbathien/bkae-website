import * as migration_20260422_072814 from './20260422_072814';
import * as migration_20260423_143307_stats_process_globals from './20260423_143307_stats_process_globals';

export const migrations = [
  {
    up: migration_20260422_072814.up,
    down: migration_20260422_072814.down,
    name: '20260422_072814',
  },
  {
    up: migration_20260423_143307_stats_process_globals.up,
    down: migration_20260423_143307_stats_process_globals.down,
    name: '20260423_143307_stats_process_globals'
  },
];
