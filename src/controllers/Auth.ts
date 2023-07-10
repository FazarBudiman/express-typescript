import { Request, Response } from "express";
import Db from "../config/Db";
import { QueryResult } from "pg";

interface auth {
    email: string,
    kataSandi: any,
    id?: string,
    name?: string,
    jenjang?: string,
    idKategoriPengguna?: number,
}

class Auth {
    private pool = Db.getInstance().connect()

    public Login = async (req: Request, res: Response): Promise<Response> => {
        const login: auth = req.body
        try {
            const response: QueryResult = await this.pool. query('SELECT * FROM ruangguru.pengguna WHERE email like $1', [login.email]);
            if (response.rowCount !== 0) {
                
                const response: QueryResult = await this.pool. query('SELECT id, pengguna.email, kata_sandi, nama, id_kategori_pengguna FROM ruangguru.pengguna LEFT JOIN ruangguru.siswa ON pengguna.id = siswa.id_siswa WHERE  pengguna.kata_sandi LIKE $1', [login.kataSandi]);
                if (response.rowCount !== 0) {
                    return res.status(200).json({
                        message: 'Login berhasil',
                        user: response.rows
                    });    
                } else {
                    return res.status(200).json({
                        message: 'Password Salah'
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
    
    // Nothing Yet
    public register = async (req: Request, res: Response): Promise<Response> => {
        const register : auth = req.body
        try {
            const response: QueryResult = 
                // await this.pool.query('call ruangguru.addpengguna (cast($1 as varchar), cast($2 as varchar), cast($2 as varchar), cast($3 as varchar), cast($4 as varchar), $5)', [register.id, register.email, register.name, register.jenjang, register.password, register.idKategoriPengguna]);
                await this.pool.query(`call ruangguru.addpengguna (cast(${register.id} as varchar), cast(${register.email} as varchar), cast('${register.name}' as varchar), cast(${register.jenjang} as varchar), cast(${register.kataSandi} as varchar), ${register.idKategoriPengguna})`);
                // await this.pool.query(`
                // BEGIN;
                // INSERT INTO ruangguru.pengguna (id, email, kata_sandi, id_kategori_pengguna, createdat) VALUES ($1, $2, $3, $4, now());
                // INSERT INTO ruangguru.siswa (id_siswa, email, nama, jenjang) VALUES ($1, $2, $5, $6);
                // COMMIT;`, [
                //     register.id, register.email, register.password, register.idKategoriPengguna, register.name, register.jenjang
                // ])
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