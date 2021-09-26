package com.axc.taskmanagement;

import com.axc.taskmanagement.service.interfaces.TaskService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TaskManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskManagementApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(TaskService taskService) {
        return args -> {
            if (taskService.findAll().isEmpty()) {
                taskService.saveTask("Eat good food", "Done");
                taskService.saveTask("Cut the grass", "To do");
                taskService.saveTask("Feed the cat", "To do");
                taskService.saveTask("Finish the code", "To do");
                taskService.saveTask("Go to bed", "To do");
                taskService.saveTask("Drink coffee in the morning", "To do");
            }
        };
    }

}
