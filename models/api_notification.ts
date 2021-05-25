import { ApiNotifications } from '.prisma/client';
import DataBase from "./prisma";

class ApiNotification {
    private connection: DataBase

    constructor () {
        this.connection = new DataBase();
    }

    async getApiNotifications(): Promise<ApiNotifications[]> {
        return await this.connection.getConnection().apiNotifications.findMany();
    }

    async getApiNotification(id: number): Promise<ApiNotifications | null> {
        return await this.connection
          .getConnection()
          .apiNotifications.findUnique({
            where: {
              id: id,
            },
          });
    }
}

export default ApiNotification;