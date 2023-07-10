import { Request, Response } from 'express';
import {QueryResult} from 'pg'
import Db from '../config/Db';

interface materi {
    id_kursus?: number,
    id: number,
    judul_materi?: string,
}

class Materi {
    private pool = Db.getInstance().connect()

    public getMateri = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response: QueryResult = await this.pool.query('SELECT materi.id, materi.judul_materi, kursus.id AS id_kursus, kursus.nama AS nama_kursus  from ruangguru.materi INNER JOIN ruangguru.kursus ON materi.id_kursus = kursus.id order by materi.id');
            return res.status(200).json(response.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    }

    public addMateri = async (req: Request, res: Response): Promise<Response> => {
        let materi: materi = req.body
        try {
            const response: QueryResult = await this.pool.query('INSERT INTO ruangguru.materi (id_kursus, id, judul_materi) VALUES ($1, $2, $3)', [materi.id_kursus, materi.id, materi.judul_materi]);
            return res.status(200).json({
                response,
                message: 'Menambah Materi Berhasil',
            });
        } catch (e : any) {
            return res.status(500).json({
                message: e.detail
            });
        }
    }

    // public deleteCourse = async (req: Request, res: Response): Promise<Response> => {
    //     const id = req.params.id
    //     try {
    //         const response: QueryResult = await this.pool.query('DELETE FROM ruangguru.kursus WHERE id = $1', [id]);
    //         console.log(response)
    //         return res.status(200).json({
    //             response,
    //             message: 'Menghapus Kursus Berhasil',
    //         });
    //     } catch (e : any) {
    //         return res.status(500).json({
    //             message: e.detail
    //         });
    //     }
    // }
}

export default Materi