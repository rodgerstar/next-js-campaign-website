import {MongoClient} from "mongodb";
import {process} from "yarn/lib/cli";
import {database} from "faker";


export default async function connectToDatabase() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        return client.db()
    } catch (error){
        console.error('Error connecting to database', error);
        throw error;
    }
}