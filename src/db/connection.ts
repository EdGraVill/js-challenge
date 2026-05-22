import { connect, connection as dbConnection } from 'mongoose';
import { join } from 'path';

export async function restoreDBConnection() {
  if (dbConnection.readyState !== 1) {
    const connectionUrl = process.env.DB_CONNECTION_URL || 'mongodb://localhost:27017/jschallenge';
    const tlsCertificateKeyFile = join(process.cwd(), process.env.DB_CERTIFICATE_PATH || 'certs/mongodb.pem');

    try {
      await connect(connectionUrl, {
        authMechanism: 'MONGODB-X509',
        authSource: '$external',
        sslValidate: true,
        tlsCertificateKeyFile,
      });
    } catch (error) {
      console.error(error);
      throw new Error(`Could not connect to database`);
    }
  }
}
