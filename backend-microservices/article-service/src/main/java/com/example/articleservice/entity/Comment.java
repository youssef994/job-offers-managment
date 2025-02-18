package com.example.articleservice.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private String userName;

    private Date creationDate = new Date(System.currentTimeMillis());

    @ManyToOne
    @JoinColumn(name = "article_id")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Article article;
}
