const fs = require('fs');
const { Parser } = require('json2csv');
const Task = require('../models/Task');
const PDFDocument = require('pdfkit');

// Générer un CSV
async function generateCSV() {
    const tasks = await Task.find().populate('assignedTo', 'name').lean();
    const fields = ['title', 'status', 'priority', 'assignedTo.name'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(tasks);
    fs.writeFileSync('reports/tasks_report.csv', csv);
    return 'CSV Report Generated';
}

// Générer un PDF
async function generatePDF() {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream('reports/tasks_report.pdf');
    doc.pipe(stream);
    doc.fontSize(18).text('Rapport des Tâches', { align: 'center' });

    const tasks = await Task.find().populate('assignedTo', 'name').lean();
    tasks.forEach(task => {
        doc.moveDown().fontSize(12).text(`Titre: ${task.title}`);
        doc.text(`Statut: ${task.status}`);
        doc.text(`Priorité: ${task.priority}`);
        doc.text(`Assigné à: ${task.assignedTo ? task.assignedTo.name : 'Non assigné'}`);
        doc.moveDown();
    });

    doc.end();
    return 'PDF Report Generated';
}




module.exports = { generateCSV, generatePDF };
