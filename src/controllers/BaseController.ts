import { QueryResult } from "pg"
import Db from "../config/Db"

export default class BaseController {
    protected pool: any

    constructor(){
        const db = new Db().getInstance()
        this.pool = db.connect()
        
    }

    protected async executeQuery(query: String): Promise<QueryResult> {
        return this.pool.query(query)
    }
}