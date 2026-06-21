
import {
    listarLineasProcesoModel,
    crearLineasProcesoModel,
    actualizarLineaProcesoModel,
    buscarLineaProcesoIdModel,
    eliminarLineaProcesoModel
} from './lineas_proceso.model.js';

export const listarLineasProcesoController = async (req, res) => {
    try {
        const lineas = await listarLineasProcesoModel();
        return res.status(200).json({
            success: true,
            data: lineas
        });
    } catch (error) {

        console.log('Error en el controlador listarLineasProcesoController: ', error)
        return res.status(500).json({
            success: false,
            message: 'Hubo un error en el servidor.'
        })
    }
}

export const crearLineasProcesoController = async (req, res) => {
    try {
        const { codigo, nombre, descripcion } = req.body;
        //validación básica
        if(!codigo || !codigo.trim() === "" || !nombre || !nombre.trim() === "" || !descripcion || !descripcion.trim() === "") {
            return res.status(400).json({
                success: false,
                message: 'Datos incompletos.'
            });
        }

        const lineaNueva = await crearLineasProcesoModel(codigo, nombre, descripcion);

        return res.status(201).json({
            success: true,
            message: 'Linea de proceso creada correctamente.',
            data: lineaNueva
        });
    } catch (error) {
        console.log('Error en el controlador crearLineasProcesoController: ', error);
        return res.status(500).json({
            success: false,
            message: 'Hubo un error en el servidor'
        })
    }
}

export const actualizarLineaProcesoController = async (req, res) => {
    try {

        const { id } = req.params;
        const { codigo, nombre, descripcion } = req.body;

        //buscar por id esa linea de proceso
        const lineaProcesoId = await buscarLineaProcesoIdModel(id);

        if(!lineaProcesoId) {
            return res.status(400).json({
                success: false,
                message: 'Linea de proceso inexistente.'
            });
        }

        const codigoFinal      = codigo || lineaProcesoId.codigo;
        const nombreFinal      = nombre || lineaProcesoId.nombre;
        const descripcionFinal = descripcion || lineaProcesoId.descripcion;

        const actualizarLineaProceso = await actualizarLineaProcesoModel(
            id, codigoFinal, nombreFinal, descripcionFinal
        );

        return res.status(200).json({
            success: true,
            message: 'Linea de proceso actualizada.',
            data: actualizarLineaProceso
        });

    } catch (error) {
        console.log('Error en el controlador actualizarLineaProcesoController: ', error);
        return res.status(500).json({
            success: false,
            message: 'Hubo un error en el servidor'
        })
    }
}

export const eliminarLineaProcesoController = async (req, res) => {
    try {
        const { id } = req.params;
        const lineProceso = await buscarLineaProcesoIdModel(id);
        if(!lineProceso) {
            return res.status(400).json({
                success: false,
                message: 'Lina de proceso inexistente.'
            });
        }

        const lineaEliminada = await eliminarLineaProcesoModel(id);

        return res.status(200).json({
            success: true,
            message: 'Línea eliminada correctamente',
            data: lineaEliminada
        });
    } catch (error) {
        console.log('Error en eliminarLineaProcesoController: ', error);
        return res.status(500).json({
            success: false,
            message: 'Hubo un error en el servidor'
        });
    }
}