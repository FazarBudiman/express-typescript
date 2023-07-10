import { Pool } from "pg";

class Db {
  private static instance: Db;
  public pool : Pool;

  connect(){
    return this.pool = new Pool({
      database: 'postgres',
      user: 'postgres',
      password: 'fazar1907',
      host: 'localhost',
      port: 5436
    })
  }

  public static getInstance(): Db {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }
}

export default Db