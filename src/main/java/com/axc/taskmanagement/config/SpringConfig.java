//package com.axc.taskmanagement.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//public class SpringConfig {
//
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
////                registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:8080");
////                registry.addMapping("/**").allowedOrigins("http://localhost:8080");
//                registry.addMapping("/**").allowedOrigins("*"); // config only for dev
//            }
//        };
//    }
//
//}
