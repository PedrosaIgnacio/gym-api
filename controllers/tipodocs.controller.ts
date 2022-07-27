import { config } from "../database/dbconfig";
import sql from "mssql";

export const getTipoDocs = async () => {
  const pool = await sql.connect(config);
  const tipodocs = await pool.request().query("Select * from TipoDoc");
  return tipodocs.recordsets;
};
