const fs = require('fs');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const Task = require('../models/Task');

const data = {
    projects: [
        { id: 1, name: "Projet A", status: "Terminé", assignedTo: 1 },
        { id: 2, name: "Projet B", status: "En cours", assignedTo: 2 }
    ],
    users: [
        { id: 1, name: "Alice Dupont", email: "alice@example.com" },
        { id: 2, name: "Bob Martin", email: "bob@example.com" }
    ],
    userProjects: [
        { userId: 1, projectId: 1 },  
        { userId: 2, projectId: 2 }   
    ],
    tasks: [
        { id: 1, title: "Analyse des besoins", status: "Terminé", priority: "Haute", assignedTo: 1, projectId: 1 },
        { id: 2, title: "Développement", status: "En cours", priority: "Moyenne", assignedTo: 2, projectId: 2 },
        { id: 3, title: "Tests", status: "En attente", priority: "Basse", assignedTo: 1, projectId: 1 }
    ],
    userTasks: [
        { userId: 1, taskId: 1 }, 
        { userId: 2, taskId: 2 },  
        { userId: 1, taskId: 3 }   
    ]
};

exports.generateCSV = (req, res) => {
    try {
        const parser = new Parser();
        const csv = parser.parse(data);
        fs.writeFileSync('report.csv', csv);
        res.download('report.csv');
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la génération du CSV" });
    }
};

exports.generatePDF = (req, res) => {
    try {
        const doc = new PDFDocument({ margin: 30 });
        const filePath = 'report.pdf';
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Titre
        doc.fontSize(18).text('Rapport des Projets et Tâches', { align: 'center' }).moveDown();

        // Tableau des projets
        doc.fontSize(14).text('Projets :', { underline: true }).moveDown();
        data.projects.forEach(proj => {
            doc.fontSize(12).text(`ID: ${proj.id} | Nom: ${proj.name} | Statut: ${proj.status}`).moveDown(0.5);
        });

        // Tableau des tâches
        doc.moveDown().fontSize(14).text('Tâches :', { underline: true }).moveDown();
        data.tasks.forEach(task => {
            doc.fontSize(12).text(`ID: ${task.id} | Titre: ${task.title} | Statut: ${task.status} | Priorité: ${task.priority}`).moveDown(0.5);
        });

        doc.end();
        
        stream.on('finish', () => res.download(filePath));
    } catch (error) {
        console.error("Erreur lors de la génération du PDF :", error);
        res.status(500).json({ error: "Erreur lors de la génération du PDF" });
    }
};

exports.generateWorkloadReport = async (req, res) => {
    try {
      const workload = await Task.aggregate([
        { $group: { _id: "$assignedTo", taskCount: { $sum: 1 } } }
      ]);
      res.json(workload);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
