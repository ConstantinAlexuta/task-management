package com.axc.taskmanagement.service.impl;

import java.util.List;
import java.util.Optional;

import com.axc.taskmanagement.model.Task;
import com.axc.taskmanagement.service.interfaces.TaskService;
import com.axc.taskmanagement.service.mapper.TaskRowMapper;

import lombok.Data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import javax.validation.constraints.NotNull;

import static com.axc.taskmanagement.utils.datasource.DataSourceLoggerUtil.*;

@Data
@Configuration
@Profile({"local_spring_boot", "docker"})
@ComponentScan("com.axc.taskmanagement")
@ConfigurationProperties("database")
@Service
public class TaskServiceImpl implements TaskService {

    private static final Logger logger = LoggerFactory.getLogger(TaskServiceImpl.class);

    @NotNull
    private String task_management_schema;

    @NotNull
    private String task_management_table;

    @NotNull
    private String task_management_sequence;

    private final JdbcTemplate jdbcTemplate;

    private final DataSource dataSource;

    public TaskServiceImpl(JdbcTemplate jdbcTemplate, DataSource dataSource) {

        this.jdbcTemplate = jdbcTemplate;

        this.dataSource = dataSource;

        this.jdbcTemplate.setDataSource(dataSource);

        logProperties("TaskServiceImpl constructor");
    }

    private void logProperties(String detail) {

        logger.info("");

        logger.info(detail);

        logOracleDataSourceAndSchemaTableSequenceProperties(
                logger, dataSource, "task", task_management_schema, task_management_table, task_management_sequence);
    }

    @Override
    public Optional<List<Task>> findAll() {

        logProperties("findAll()");

        List<Task> taskList = jdbcTemplate
                .query("SELECT * FROM " + task_management_schema + "." + task_management_table, new TaskRowMapper());

        logger.info("");
        logger.info("findAll() >> get List<Task> >> size = " + taskList.size());

        return Optional.of(taskList);
    }

    @Override
    public Optional<Task> getTaskById(long id) {

        logProperties("getTaskById(" + id + ")");

        Task task = jdbcTemplate.queryForObject(
                "SELECT * FROM " + task_management_schema + "." + task_management_table
                        + " WHERE N_TASK_ID = '" + id + "'", new TaskRowMapper());

        logger.info("\n" + "getTaskById(" + id + ") >> task = " + task);

        if (task == null) {
            logger.info("\n" + "getTaskById(" + id + ") >> doesn't exist an task with this id in: " + task_management_schema + "." + task_management_table);
            return Optional.empty();
        } else {
            return Optional.of(task);
        }
    }

    @Override
    public Long saveTask(String description, String status) {

        logProperties("saveTask()");

        logger.info("");
        logger.info("saveTask() >> save the fallowing task info: ");
        logger.info("saveTask() >> description = " + description);
        logger.info("saveTask() >> status = " + status);

        Long newTaskId = jdbcTemplate.queryForObject(
                "SELECT " + task_management_schema + "." + task_management_sequence + ".NEXTVAL AS ID FROM DUAL", Long.class);

        String insertSql =
                "INSERT INTO " + task_management_schema + "." + task_management_table +
                        "(N_TASK_ID, VCH_DESCRIPTION, VCH_STATUS) " + "VALUES (" + newTaskId + ", '" + description + "', '" + status + "')";

        int rowAffected = jdbcTemplate.update(insertSql);

        return newTaskId;
    }

    @Override
    public void updateTaskDescription(long id, String description) {

        logProperties("updateTaskDescription(" + id + ", " + description + ")");

        logger.info("");
        logger.info("updateTaskDescription(" + id + ", " + description + ")");


        String insertSql =
                "UPDATE " + task_management_schema + "." + task_management_table +
                        " SET " + task_management_table + ".VCH_DESCRIPTION = '" + description + "' WHERE N_TASK_ID = " + id + "";

        int rowAffected = jdbcTemplate.update(insertSql);

        logger.info("rowAffected = " + rowAffected);
    }

    @Override
    public void updateTaskStatus(long id, String status) {

        logProperties("updateTaskStatus(" + id + ", " + status + ")");

        logger.info("");
        logger.info("updateTaskStatus(" + id + ", " + status + ")");


        String insertSql =
                "UPDATE " + task_management_schema + "." + task_management_table +
                        " SET " + task_management_table + ".VCH_STATUS = '" + status + "' WHERE N_TASK_ID = " + id + "";

        int rowAffected = jdbcTemplate.update(insertSql);

        logger.info("rowAffected = " + rowAffected);
    }

    @Override
    public void updateTask(long id, String description, String status) {

        logProperties("updateTask(" + id + ", " + description + ", " + status + ")");

        logger.info("");
        logger.info("updateTask(" + id + ", " + description + ", " + status + ")");


        String insertSql =
                "UPDATE " + task_management_schema + "." + task_management_table +
                        " SET "
                        + task_management_table + ".VCH_DESCRIPTION = '" + description + "', "
                        + task_management_table + ".VCH_STATUS = '" + status + "' "
                        + " WHERE N_TASK_ID = " + id + "";

        int rowAffected = jdbcTemplate.update(insertSql);

        logger.info("rowAffected = " + rowAffected);
    }

    @Override
    public Long deleteById(long id) {

        logProperties("deleteById(" + id + ")");

        logger.info("");
        logger.info("deleteById(" + id + ")");


        String insertSql =
                "DELETE FROM " + task_management_schema + "." + task_management_table +
                        " WHERE N_TASK_ID=" + id + "";

        int rowAffected = jdbcTemplate.update(insertSql);

        logger.info("rowAffected = " + rowAffected);

        return (long) rowAffected;
    }

    @Override
    public Long deleteAll() {

        logProperties("deleteAll()");

        logger.info("");
        logger.info("deleteAll()");


        String insertSql =
                "DELETE FROM " + task_management_schema + "." + task_management_table + "";

        int rowAffected = jdbcTemplate.update(insertSql);

        logger.info("rowAffected = " + rowAffected);

        return (long) rowAffected;
    }

}
