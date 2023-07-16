import { Request, Response } from 'express';
import {QueryResult} from 'pg'
import BaseController from './BaseController';

interface materi {
    id_kursus?: number,
    id: number,
    judul_materi?: string,
}

class Materi extends BaseController {

    public getMateri = async (req: Request, res: Response): Promise<Response> => {
        try {
            const response: QueryResult = await this.executeQuery('SELECT materi.id, materi.judul_materi, kursus.id AS id_kursus, kursus.nama AS nama_kursus  from ruangguru.materi INNER JOIN ruangguru.kursus ON materi.id_kursus = kursus.id order by materi.id');
            return res.status(200).json(response.rows);
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    }

    public addMateri = async (req: Request, res: Response): Promise<Response> => {
        let materi: materi = req.body
        try {
            const response: QueryResult = await this.executeQuery(`INSERT INTO ruangguru.materi (id_kursus, id, judul_materi) VALUES (${materi.id_kursus}, ${materi.id}, '${materi.judul_materi}')`);
            console.log(response)
            return res.status(200).json({
                response,
                message: 'Menambah Materi Berhasil',
            });
        } catch (e : any) {
            console.log(e)
            return res.status(500).json({
                message: e.detail
            });
        }
    }

    public deleteMateri = async (req: Request, res: Response): Promise<Response> => {
        const id = req.params.id
        try {
            const response: QueryResult = await this.executeQuery(`DELETE FROM ruangguru.materi WHERE id = ${id}` );
            return res.status(200).json({
                response,
                message: 'Menghapus Materi Berhasil',
            });
        } catch (e : any) {
            console.log(e)
            return res.status(500).json({
                message: e.detail
            });
        }
    }

    public updateMateri = async (req: Request, res: Response): Promise<Response> => {
        const course: materi = req.body
        try {
            const response: QueryResult = await this.executeQuery(`UPDATE ruangguru.materi SET judul_materi = '${course.judul_materi}' WHERE id = ${course.id}`)
            return res.status(200).json({
                response,
                message: 'Memperbarui Materi Berhasil'
            })
        } catch (e: any) {
            return res.status(500).json({
                message: e
            })
        }
    }
}

export default Materi