import { PrismaClient } from "@prisma/client";

class DataBase {
    private client: PrismaClient

    constructor(){
        this.client = new PrismaClient();
    }

    getConnection(): PrismaClient {
        return this.client;
    }

    async release() {
        await this.client.$disconnect();
    }
}

export default DataBase;