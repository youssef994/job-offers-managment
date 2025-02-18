package com.pi.bookingservice.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class RoomServiceClientConfig {
    @Bean
    public WebClient roomServiceWebClient() {
        return WebClient.create("http://room-service");
    }
}