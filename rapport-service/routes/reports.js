const express = require('express');
const { generateCSV, generatePDF , generateWorkloadReport} = require('../controllers/reportController');

const router = express.Router();

router.get('/csv', generateCSV);
router.get('/pdf', generatePDF);
router.get('/workload', generateWorkloadReport);

module.exports = router;