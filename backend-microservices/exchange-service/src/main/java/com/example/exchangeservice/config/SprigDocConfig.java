package com.example.exchangeservice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SprigDocConfig  {
    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI().info(infoAPI());
    }

    public Info infoAPI() {
        return new Info().title("CulTechConnect exchange-program").description("-------------").version("1.0").contact(contactAPI());
    }

    public Contact contactAPI() {
        Contact contact = new Contact().name("youssef").email("*************@.").url("https://www.linkedin.com/in/**********/");
        return contact;
    }
    @Bean
    public GroupedOpenApi productPublicApi() {
        return GroupedOpenApi.builder()
                .group("CulTechConnect exchange-program")
                .pathsToMatch("/contrat/**")
                .pathsToExclude("**")
                .build();
    }
    @Bean
    public GroupedOpenApi All() {
        return GroupedOpenApi.builder()
                .group("ALL API")
                .pathsToMatch("/**")
                .build();
    }
}