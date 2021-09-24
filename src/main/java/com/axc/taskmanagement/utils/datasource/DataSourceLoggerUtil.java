package com.axc.taskmanagement.utils.datasource;


import oracle.jdbc.pool.OracleDataSource;

import org.slf4j.Logger;

import javax.sql.DataSource;

import java.sql.SQLException;
import java.util.Properties;

public class DataSourceLoggerUtil {

    public static void logOracleDataSourceAndSchemaTableSequenceProperties(
            Logger logger, DataSource dataSource, String entityName, String schema, String table, String sequence)   {

        logSchemaTableSequenceProperties(logger, entityName, schema, table, sequence);

        if (dataSource instanceof OracleDataSource) {
            logOracleDataSourceProperties(logger, (OracleDataSource) dataSource);
        }
    }

    public static void logOracleDataSourceProperties(Logger logger, OracleDataSource oracleDataSource)   {

        logger.info("");
        logger.info("");
        logger.info("Oracle data source configuration = " + oracleDataSource);
        logger.info("");

        try {
            logger.info("Oracle data source configuration = " + oracleDataSource.getConnectionProperties());
            logger.info("");
            logger.info("Oracle data source configuration >> dataSourceName = " + oracleDataSource.getDataSourceName());
            logger.info("Oracle data source configuration >> user = " + oracleDataSource.getUser());
            logger.info("Oracle data source configuration >> url = " + oracleDataSource.getURL());
            logger.info("Oracle data source configuration >> ImplicitCachingEnabled = " + oracleDataSource.getImplicitCachingEnabled());
            logger.info("Oracle data source configuration >> FastConnectionFailoverEnabled = " + oracleDataSource.getFastConnectionFailoverEnabled());

            logger.info("");

            Properties properties = oracleDataSource.getConnectionProperties();

            for (String proprietyName : properties.stringPropertyNames()) {
                logger.info("logDatasource() >> " + proprietyName + " = " + properties.getProperty(proprietyName));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }

    public static void logSpringDatasourceProperties(Logger logger, String username, String password, String url) {
        logger.info("");
        logger.info("");
        logger.info("Oracle data source configuration >> properties from application.yml: ");
        logger.info("Oracle data source configuration >> username = " + username);
        logger.info("Oracle data source configuration >> password = " + password);
        logger.info("Oracle data source configuration >> url = " + url);
    }

    public static void logSchemaTableSequenceProperties(Logger logger, String entityName, String schema, String table, String sequence) {
        logger.info("");
        logger.info("");
        logger.info("Data source configuration >> properties from application.yml: ");
        logger.info("Data source configuration >> " + entityName + "_schema = " + schema);
        logger.info("Data source configuration >> " + entityName + "_table = " + table);
        logger.info("Data source configuration >> " + entityName + "_sequence = " + sequence);
    }

}
