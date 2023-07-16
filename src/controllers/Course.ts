import { Request, Response } from 'express';
import {QueryResult} from 'pg'
import BaseController from './BaseController';

interface course {
    idKategoriKursus?: number,
    id: number,
    name?: string,
}

class Course extends BaseController {

    public getCourse = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response: QueryResult = await this.executeQuery('SELECT * FROM ruangguru.kursus ORDER BY id ASC');
            return res.status(200).json(response.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    }

    public addCourse = async (req: Request, res: Response): Promise<Response> => {
        let course: course = req.body
        try {
            const response: QueryResult = await this.executeQuery(`INSERT INTO ruangguru.kursus (id_kategori_kursus, id, nama) VALUES (${course.idKategoriKursus}, ${course.id}, '${course.name}')`);
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
            const response: QueryResult = await this.executeQuery(`DELETE FROM ruangguru.kursus WHERE id = ${id}`);
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

    public updateCourse = async (req: Request, res: Response): Promise<Response> => {
        const course: course = req.body
        try {
            const response: QueryResult = await this.executeQuery(`UPDATE ruangguru.kursus SET nama = '${course.name}' WHERE id = ${course.id}`)
            return res.status(200).json({
                response,
                message: 'Memperbarui Kursus Berhasil'
            })
        } catch (e: any) {
            return res.status(500).json({
                message: e
            })
        }
    }
}

export default Course