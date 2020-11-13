import SQLite from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = new SQLite(path.join(__dirname, '../data/SQL/vought.sqlite'));

class SQL {
    constructor() {
        throw new Error('This class cannot be instantiated!');
    }

    static InitDB() {
        const userdb = sql.prepare('SELECT count(*) FROM sqlite_master WHERE type=\'table\' AND name = \'users\';').get();
        if (!userdb['count(*)']) {
            sql.prepare('CREATE TABLE users (id TEXT PRIMARY KEY, blacklist BIT);').run();
            sql.prepare('CREATE UNIQUE INDEX idx_users_id ON users (id);').run();
            sql.pragma('synchronous = 1');
            sql.pragma('journal_mode = wal');
        }

        process.vought.getUser = sql.prepare('SELECT * FROM users WHERE id = ?');
        process.vought.setUser = sql.prepare('INSERT OR REPLACE INTO users (id, blacklist) VALUES (@id, @blacklist);');

        process.vought.db = sql;
    }

    static Close() {
        sql.close();
    }
}

export default SQL;
