import { Request, Response } from 'express';
import {QueryResult} from 'pg'
import Db from '../config/Db';

interface course {
    idKategoriKursus?: number,
    id: number,
    name?: string,
}

class Course {
    private pool = Db.getInstance().connect()

    public getCourse = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response: QueryResult = await this.pool.query('SELECT * FROM ruangguru.kursus ORDER BY id ASC');
            return res.status(200).json(response.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    }

    public addCourse = async (req: Request, res: Response): Promise<Response> => {
        let course: course = req.body
        try {
            const response: QueryResult = await this.pool.query('INSERT INTO ruangguru.kursus (id_kategori_kursus, id, nama) VALUES ($1, $2, $3)', [course.idKategoriKursus, course.id, course.name]);
            return res.status(200).json({
                response,
                message: 'Menambah Kursus Berhasil',
            });
        } catch (e : any) {
            return res.status(500).json({
                message: e.detail
            });
        }
    }

    public deleteCourse = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id
        try {
            const response: QueryResult = await this.pool.query('DELETE FROM ruangguru.kursus WHERE id = $1', [id]);
            return res.status(200).json({
                response,
                message: 'Menghapus Kursus Berhasil',
            });
        } catch (e : any) {
            return res.status(500).json({
                message: e.detail
            });
        }
    }
}

export default Course