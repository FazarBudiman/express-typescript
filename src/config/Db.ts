import { Pool } from "pg";
import IDb from "./IDb"

class Db implements IDb {
  private static instance: Db;
  public pool : Pool;
    // static getInstance: any;

  connect(){
    return this.pool = new Pool({
      database: 'postgres',
      user: 'postgres',
      password: 'fazar1907',
      host: 'localhost',
      port: 5436
    })
  }

  getInstance(): Db {
    if (!Db.instance) {
      Db.instance = new Db()
    }
    return Db.instance
  }
}

export default Db