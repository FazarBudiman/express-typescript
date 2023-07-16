import { Request, Response } from "express";
import { QueryResult } from "pg";
import BaseController from "./BaseController";

interface auth {
    email: string,
    kataSandi: any,
    id?: string,
    name?: string,
    jenjang?: string,
    idKategoriPengguna?: number,
}

class Auth extends BaseController {

    public Login = async (req: Request, res: Response): Promise<Response> => {
        const login: auth = req.body
        try {
            const response: QueryResult = await this.executeQuery(`SELECT * FROM ruangguru.pengguna WHERE email like '${login.email}'`);
            if (response.rowCount !== 0) {
                
                const response: QueryResult = await this.executeQuery(`SELECT id, pengguna.email, kata_sandi, nama, id_kategori_pengguna FROM ruangguru.pengguna LEFT JOIN ruangguru.siswa ON pengguna.id = siswa.id_siswa WHERE  pengguna.kata_sandi LIKE '${login.kataSandi}'`);
                if (response.rowCount !== 0) {
                    return res.status(200).json({
                        message: 'Login berhasil',
                        user: response.rows
                    });    
                } else {
                    return res.status(200).json({
                        message: 'Password Salah',
                    })
                }
            } else {
                return res.status(200).json({
                    message: 'Username Salah'
                });    
            }
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    }
    
    public register = async (req: Request, res: Response): Promise<Response> => {
        const register : auth = req.body
        try {
            const response: QueryResult = await this.executeQuery(`
                BEGIN;
                INSERT INTO ruangguru.pengguna (id, email, kata_sandi, id_kategori_pengguna, createdat) VALUES ('${register.id}', '${register.email}', '${register.kataSandi}, ${register.idKategoriPengguna}, now());
                INSERT INTO ruangguru.siswa (id_siswa, email, nama, jenjang) VALUES ('${register.id}', '${register.email}', '${register.name}', '${register.jenjang}');
                COMMIT;`)
            return res.status(200).json({
                response,
                message: 'Register Berhasil',
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json('Internal Server error');
        }
    }
}

export default Auth