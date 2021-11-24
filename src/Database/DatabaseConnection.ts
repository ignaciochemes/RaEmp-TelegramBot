import mongoose from 'mongoose';

export class DatabaseConnection {
    private static _instance: DatabaseConnection;
    
    private constructor(){
        this.getConnection();
    }

    public static Instance(): DatabaseConnection {
        if (!DatabaseConnection._instance) DatabaseConnection._instance = new DatabaseConnection();
        return DatabaseConnection._instance;
    }

    async getConnection() {
        await mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => { 
            console.info('Base de datos conectada');
        })
        .catch(() => console.error('Error al conectar la base de datos'))
    }
}