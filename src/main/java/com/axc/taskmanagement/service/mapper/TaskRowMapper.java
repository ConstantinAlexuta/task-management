package com.axc.taskmanagement.service.mapper;

import com.axc.taskmanagement.model.Task;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TaskRowMapper implements RowMapper<Task> {

    @Override
    public Task mapRow(ResultSet rs, int rowNum) throws SQLException {

        Task task = new Task();

        task.setId(Long.valueOf(rs.getString("N_TASK_ID")));
        task.setDescription(rs.getString("VCH_DESCRIPTION"));
        task.setStatus(rs.getString("VCH_STATUS"));

        return task;
    }
}