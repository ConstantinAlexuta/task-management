package com.axc.taskmanagement.controller;

import com.axc.taskmanagement.model.Task;
import com.axc.taskmanagement.service.interfaces.TaskService;

import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping(value = "/api/task/save")
    public ResponseEntity<Long> save(@RequestHeader("description") String description, @RequestHeader("status") String status) {
        Long rowAffected = taskService.saveTask(description, status);
        return new ResponseEntity<>(rowAffected, HttpStatus.CREATED);
    }

    @GetMapping(value = "/api/task")
    @ResponseStatus(HttpStatus.OK)
    public @NotNull Iterable<Task> list() {
        Optional<List<Task>> tasksOptional = this.taskService.findAll();
        List<Task> tasks = null;
        if (tasksOptional.isPresent()) {
            tasks = tasksOptional.get();
        }
        return tasks;
    }

    @GetMapping(value = "/api/task/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> taskOptional = this.taskService.getTaskById(id);
        Task task = null;
        if (taskOptional.isPresent()) {
            task = taskOptional.get();
            return new ResponseEntity<>(task, HttpStatus.OK);
        }
        return new ResponseEntity<>(task, HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/api/task/{id}")
    public ResponseEntity<Objects> updateTask(
            @PathVariable Long id,
            @RequestHeader(value = "description", required = false, defaultValue = "is-not-present-in-the-call") String description,
            @RequestHeader(value = "status", required = false, defaultValue = "is-not-present-in-the-call") String status
    ) {
        if (!description.equals("is-not-present-in-the-call") && status.equals("is-not-present-in-the-call")) {
            taskService.updateTaskDescription(id, description);
        } else if (description.equals("is-not-present-in-the-call") && !status.equals("is-not-present-in-the-call")) {
            taskService.updateTaskStatus(id, status);
        } else if (!description.equals("is-not-present-in-the-call")) {
            taskService.updateTask(id, description, status);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/api/task/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) {
        Long rowAffected = taskService.deleteById(id);
        return new ResponseEntity<>(rowAffected, HttpStatus.OK);
    }

    @DeleteMapping(value = "/api/task/deleteAll")
    public ResponseEntity<Long> deleteAll() {
        Long rowAffected = taskService.deleteAll();
        return new ResponseEntity<>(rowAffected, HttpStatus.OK);
    }

}