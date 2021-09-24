package com.axc.taskmanagement.service.interfaces;

import com.axc.taskmanagement.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    Optional<List<Task>> findAll();

    Optional<Task> getTaskById(long id);

    Long saveTask(String description, String status);

    void updateTaskDescription(long id, String description);

    Long deleteById(long id);

    Long deleteAll();
}