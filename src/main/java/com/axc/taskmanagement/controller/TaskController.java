package com.axc.taskmanagement.controller;

import com.axc.taskmanagement.model.Task;
import com.axc.taskmanagement.service.interfaces.TaskService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
public class TaskController {

    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }


    @PostMapping(value = "/api/task/save")
    public ResponseEntity<Objects> save(@RequestHeader("description") String description, @RequestHeader("status") String status) {
        taskService.saveTask(description, status);
        return new ResponseEntity<>(HttpStatus.CREATED);
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
    public @NotNull ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> taskOptional = this.taskService.getTaskById(id);
        return taskOptional
                .map(task -> new ResponseEntity<>(task, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(value = "/api/task")
    public ResponseEntity<Objects> updateTaskDescription(@RequestHeader("id") String id, @RequestHeader("description") String description) {
        taskService.updateTaskDescription(Long.parseLong(id), description);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/api/task")
    public ResponseEntity<Long> deleteById(@RequestHeader("id") String id) {
        Long rowAffected = taskService.deleteById(Long.parseLong(id));
        return new ResponseEntity<>(rowAffected, HttpStatus.OK);
    }

    @DeleteMapping(value = "/api/task/deleteAll")
    public ResponseEntity<Long> deleteAll() {
        Long rowAffected = taskService.deleteAll();
        return new ResponseEntity<>(rowAffected, HttpStatus.OK);
    }

}