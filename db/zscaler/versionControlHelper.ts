import liquibase from 'liquibase';
import { Maybe } from 'purify-ts';
import { IConfig } from './Config_zscaler'
import dotenv from 'dotenv';

export function runMigration(migrationConfig: IConfig) {
    dotenv.config();
    const connectionInfo_mayBe = Maybe.fromNullable(String(process.env.PG_CONNECTION_STRING));
    if (connectionInfo_mayBe.isNothing()) {
        throw "database connection string not found"
    }
    let connectionString = connectionInfo_mayBe.extract()
    const detailsConnection = connectionString
        .split('//').toString()
        .split(",").toString()
        .split(":").splice(1, 2).toString()
        .split("@").toString()
        .split(",").splice(1, 2)
    const db = connectionString.split('@').splice(1, 1)
    const username = detailsConnection[0]
    const password = detailsConnection[1]
    const conn_url = migrationConfig.JDBC_POSTGRES + db
    // config to update the DB
    const config = {
        classpath: migrationConfig.CLASSPATH_POSTGRES,
        changeLogFile: migrationConfig.LIQ_CHANGELOG_MASTER,
        url: conn_url,
        username: username,
        password: password,
        outputFile: migrationConfig.CONFIG_OUTFILE
    }
    // config to generate the history of the DB
    const configHistory = {
        classpath: migrationConfig.CLASSPATH_POSTGRES,
        url: conn_url,
        username: username,
        password: password,
        outputFile: migrationConfig.HISTORY_FILE
    }
    // config for comparison of 2 diff schemas
    // const referenceConfig =
    // {
    //   url: conn_url,
    //   username: username,
    //   password: password,
    //   referenceUrl: MigrationConfig.LIQUIBASE_REF_URL,
    //   referenceUsername: username,
    //   referencePassword: password,
    //   overwriteOutputFile: MigrationConfig.LIQ_REF_OVERWRITE_OUTPUTFILE,
    //   outputFile: MigrationConfig.LIQ_REF_OUTPUTFILE,
    //   logLevel: process.env.LOG_BASE_LEVEL,
    //   logFile: MigrationConfig.LIQ_REF_LOGFILE
    // }
    // DB snapshot config
    const snapshotConfig =
    {
        classpath: migrationConfig.CLASSPATH_POSTGRES,
        url: conn_url,
        username: username,
        password: password,
        overwriteOutputFile: migrationConfig.LIQ_OVERWRITE_OUTPUTFILE,
        outputFile: migrationConfig.LIQ_OUTPUTFILE,
        logFile: migrationConfig.LIQ_LOGFILE
    }
    console.log(config, configHistory, snapshotConfig)
    liquibase(snapshotConfig)
        .run('snapshot')
        .then(() => console.log('snapshot of current database - successful'))
        .catch((err) => console.error('snapshot of current database - failed', err));
    liquibase(configHistory)
        .run('history')
        .then(() => console.log('History generation of current databse - successful'))
        .catch((err) => console.error('History generation of current databse - failed', err));
    liquibase(config)
        .run('validate')
        .then(() => console.log('validation of current database - successful'))
        .catch((err) => console.error('validation of current database - failed', err));
    liquibase(config)
        .run('status', '--verbose')
        .then(() => console.log('status check of current database - successful'))
        .catch((err) => console.error('status check of current database - failed', err));
    liquibase(config)
        .run('updateSQL')
        .then(() => console.log('inspect SQL before running update - successful'))
        .catch((err) => console.error('inspect SQL before running update - failed', err));
    liquibase(config)
        .run('update')
        .then(() => console.log('update the database - successful'))
        .catch((err) => console.log('update the database - failed', err));
    // liquibase(referenceConfig)
    //   .run('diff')
    //   .then(() => console.log('success diff'))
    //   .catch((err) => console.error('fail', err));
}