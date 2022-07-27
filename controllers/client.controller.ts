import { config } from "../database/dbconfig";
import sql from "mssql";

interface IClient {
  nombre: string;
  apellido: string;
  email: string;
  telefono: number;
  documento: number;
  fechaNacimiento: string;
  sexo: string;
  tipoDoc: number;
}

//GET CLIENTES
export const getClients = async () => {
  const pool = await sql.connect(config);
  const clients = await pool
    .request()
    .query(
      "select c.id, c.nombre, c.apellido, c.email, c.telefono, c.documento, c.sexo, c.fechaNacimiento, t.tipo as 'TipoDoc' from Cliente c join TipoDoc t on t.id = c.TipoDoc"
    );
  return clients.recordsets;
};

//GET CLIENTE POR ID
export const getClientById = async (idParam: string) => {
  const id = parseInt(idParam);
  const pool = await sql.connect(config);
  const client = await pool
    .request()
    .input("id", sql.Int, id)
    .execute("sp_consultar_cliente_by_id");
  return client.recordset;
};

//POST CLIENTE
export const postClient = async (client: IClient) => {
  const pool = await sql.connect(config);
  const insertClient = await pool
    .request()
    .input("nombre", sql.VarChar, client.nombre)
    .input("apellido", sql.VarChar, client.apellido)
    .input("email", sql.VarChar, client.email)
    .input("telefono", sql.Int, client.telefono)
    .input("documento", sql.Int, client.documento)
    .input("fechaNacimiento", sql.VarChar, client.fechaNacimiento)
    .input("sexo", sql.VarChar, client.sexo)
    .input("TipoDoc", sql.Int, client.tipoDoc)
    .execute("sp_insert_cliente");
};

//DELETE CLIENTE
export const deleteClient = async (idParam: string) => {
  const id = parseInt(idParam);
  const pool = await sql.connect(config);
  const insertClient = await pool
    .request()
    .input("id", sql.Int, id)
    .execute("sp_eliminar_cliente");
};
