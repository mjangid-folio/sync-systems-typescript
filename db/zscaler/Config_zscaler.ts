export interface IConfig {
    LIQ_CHANGELOG_MASTER: string;
    LIQUIBASE_REF_URL: string;
    CLASSPATH_POSTGRES: string;
    LIQ_REF_OVERWRITE_OUTPUTFILE: boolean;
    LIQ_REF_LOGFILE: string;
    LIQ_REF_OUTPUTFILE: string;
    LIQ_OVERWRITE_OUTPUTFILE: boolean;
    LIQ_LOGFILE: string;
    LIQ_OUTPUTFILE: string;
    JDBC_POSTGRES: string;
    CONFIG_OUTFILE: string;
    HISTORY_FILE: string;
}

export class Config {
    public static readonly LIQ_CHANGELOG_MASTER = "migrations/zscaler/db.changelog-zscaler.xml"
    public static readonly LIQUIBASE_REF_URL = "jdbc:postgresql://localhost/pg"
    public static readonly CLASSPATH_POSTGRES = "node_modules/liquibase/lib/Drivers/postgresql-42.2.8.jar"
    public static readonly LIQ_REF_OVERWRITE_OUTPUTFILE = true
    public static readonly LIQ_REF_LOGFILE = "dbRefPostgresLogFile.txt"
    public static readonly LIQ_REF_OUTPUTFILE = "dbRefPostgresOutputFile.txt"
    public static readonly LIQ_OVERWRITE_OUTPUTFILE = false
    public static readonly LIQ_LOGFILE = "dbPostgresLogFile.txt"
    public static readonly LIQ_OUTPUTFILE = "dbPostgresSnapshot.yaml"
    public static readonly JDBC_POSTGRES = "jdbc:postgresql://"
    public static readonly CONFIG_OUTFILE = "postgresDbUpdateOut.sql"
    public static readonly HISTORY_FILE = "changeHistory.txt"
}
