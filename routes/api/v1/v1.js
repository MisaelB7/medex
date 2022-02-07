const express = require('express');
const router = express.Router();
const pacientesRoutes = require('./pacientes/pacientes');
const expedientesRoutes = require('./expedientes/expedientes');
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
//middlewares
router.use('/pacientes', verifyApiHeaderToken , pacientesRoutes);
router.use('/expedientes', verifyApiHeaderToken , expedientesRoutes);
module.exports = router;

