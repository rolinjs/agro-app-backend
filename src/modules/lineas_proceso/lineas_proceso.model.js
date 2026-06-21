import { pool } from '../../config/db.js';

export const listarLineasProcesoModel = async () => {
    const sql =  `
        SELECT
            id, codigo, nombre, descripcion, estado, fecha_creacion, fecha_actualizacion
        FROM lineas_proceso ORDER BY id DESC
    `;
    
    const { rows } = await pool.query(sql);
    return rows;
}

export const buscarLineaProcesoIdModel = async (id) => {
    const sql = `SELECT * FROM lineas_proceso WHERE id = $1`;
    const { rows } = await pool.query(sql, [id]);
    return rows[0];
}

export const crearLineasProcesoModel = async (
    codigo, nombre, descripcion
) => {
    const sql = `INSERT INTO lineas_proceso(codigo, nombre, descripcion)VALUES($1, $2, $3) RETURNING *`;
    const values = [codigo, nombre, descripcion];
    const { rows } = await pool.query(sql, values);
    return rows[0];
}

export const actualizarLineaProcesoModel = async (
    id, codigo, nombre, descripcion
) => {
    const sql = `
        UPDATE lineas_proceso SET codigo = $1, nombre = $2, descripcion = $3 WHERE id = $4 RETURNING *
    `;
    const values = [codigo, nombre, descripcion, id];
    const { rows } = await pool.query(sql, values);
    return rows[0];
}

export const eliminarLineaProcesoModel = async (id) => {
    const sql = `
        DELETE FROM lineas_proceso WHERE id = $1 RETURNING *
    `;
    const { rows } = await pool.query(sql, [id]);
    return rows[0];
}