import { Request, Response } from "express";
import Db from "../config/Db";
import { QueryResult } from "pg";

class Student {
    private pool = Db.getInstance().connect()

    public getStudent = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response: QueryResult = await this.pool.query('select siswa.id_siswa, siswa.nama, siswa.email,  pengguna.id_kategori_pengguna from ruangguru.siswa left join ruangguru.pengguna on siswa.id_siswa = pengguna.id');
            return res.status(200).json(response.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    }
}

export default Student