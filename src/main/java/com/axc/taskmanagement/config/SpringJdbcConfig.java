package com.axc.taskmanagement.config;

import lombok.Data;

import oracle.jdbc.pool.OracleDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;
import javax.validation.constraints.NotNull;
import java.sql.SQLException;

import static com.axc.taskmanagement.utils.datasource.DataSourceLoggerUtil.*;

@Data
@Configuration
@Profile({"local_spring_boot", "docker"})
@ComponentScan("com.axc.taskmanagement")
@ConfigurationProperties("spring.datasource")
public class SpringJdbcConfig {

    private static final Logger logger = LoggerFactory.getLogger(SpringJdbcConfig.class);

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String url;

    @Bean
    public JdbcTemplate getJdbcTemplate() throws SQLException {
        return new JdbcTemplate(this.oracleDataSource());
    }

    @Bean
    public DataSource oracleDataSource() throws SQLException {

        OracleDataSource oracleDataSource = new OracleDataSource();

        oracleDataSource.setUser(username);
        oracleDataSource.setPassword(password);
        oracleDataSource.setURL(url);

        oracleDataSource.setImplicitCachingEnabled(true);
        oracleDataSource.setFastConnectionFailoverEnabled(true);

        logSpringDatasourceProperties(logger, username, password, url);

        logOracleDataSourceProperties(logger, oracleDataSource);

        return oracleDataSource;
    }
}