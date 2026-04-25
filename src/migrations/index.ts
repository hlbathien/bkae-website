import * as migration_20260422_072814 from './20260422_072814';
import * as migration_20260423_143307_stats_process_globals from './20260423_143307_stats_process_globals';
import * as migration_20260424_post_body_markdown from './20260424_post_body_markdown';

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
  {
    up: migration_20260424_post_body_markdown.up,
    down: migration_20260424_post_body_markdown.down,
    name: '20260424_post_body_markdown'
  },
];
