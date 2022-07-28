import { config } from "../database/dbconfig";
import sql from "mssql";

interface IUser {
    idCliente: number;
    usuario: string;
    contrasena: string;
    fotoPerfil: string;
}

//Add Profile Photo to  USER
export const addPhoto = async (user: IUser) => {
    const pool = await sql.connect(config);
    const insertClient = await pool
        .request()
        .input("idCliente", sql.Int, user.idCliente)
        .input("fotoPerfil", sql.VarChar, user.fotoPerfil)
        .execute("sp_addprofilephoto");
};

export const getLastUserAdded = async () => {
    const pool = await sql.connect(config);
    const clients = await pool
      .request()
      .query(
        "select top 1 u.idCliente from Usuarios u order by u.idCliente desc"
      );
    return clients.recordsets;
  };
  
