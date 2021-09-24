package com.axc.taskmanagement.repository;

import com.axc.taskmanagement.model.Task;

import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}