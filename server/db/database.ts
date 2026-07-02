import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve(process.cwd(), 'data', 'lumen_studio.sqlite');

class DatabaseManager {
  private db: SqlJsDatabase | null = null;
  private isInitialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    this.initPromise = this.init();
  }

  private async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      const SQL = await initSqlJs();
      
      // Ensure data directory exists
      const dataDir = path.dirname(DB_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Load existing database file or create new
      if (fs.existsSync(DB_PATH)) {
        const fileBuffer = fs.readFileSync(DB_PATH);
        this.db = new SQL.Database(fileBuffer);
        console.log(`[Database] Loaded existing SQLite database from ${DB_PATH}`);
      } else {
        this.db = new SQL.Database();
        console.log(`[Database] Created new in-memory SQLite database (will save to ${DB_PATH})`);
      }

      this.isInitialized = true;
    } catch (err) {
      console.error('[Database] Failed to initialize SQLite WebAssembly engine:', err);
      throw err;
    }
  }

  public async getDb(): Promise<SqlJsDatabase> {
    if (!this.isInitialized && this.initPromise) {
      await this.initPromise;
    }
    if (!this.db) {
      throw new Error('[Database] Database instance is not available.');
    }
    return this.db;
  }

  public async save(): Promise<void> {
    const db = await this.getDb();
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }

  /**
   * Execute a SELECT query and return array of object rows
   */
  public async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const db = await this.getDb();
    const stmt = db.prepare(sql);
    try {
      stmt.bind(params);
      const rows: T[] = [];
      while (stmt.step()) {
        rows.push(stmt.getAsObject() as unknown as T);
      }
      return rows;
    } finally {
      stmt.free();
    }
  }

  /**
   * Execute a single SELECT query and return one row or null
   */
  public async queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.query<T>(sql, params);
    return rows.length > 0 ? rows[0] : null;
  }

  /**
   * Execute an INSERT, UPDATE, or DELETE query and save to disk
   */
  public async run(sql: string, params: any[] = []): Promise<{ changes: number }> {
    const db = await this.getDb();
    db.run(sql, params);
    const changes = db.getRowsModified();
    await this.save();
    return { changes };
  }

  /**
   * Execute raw SQL statements (for schema creation / migrations)
   */
  public async exec(sql: string): Promise<void> {
    const db = await this.getDb();
    db.exec(sql);
    await this.save();
  }
}

export const dbManager = new DatabaseManager();
