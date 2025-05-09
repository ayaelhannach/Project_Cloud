# Utiliser une image officielle de Node.js
FROM node:18

# Définir le dossier de travail à l'intérieur du conteneur
WORKDIR /app

# Copier le fichier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Exposer le port 5000 pour la communication avec l'extérieur
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["node", "app.js"]
 
