package com.example.articleservice.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Article {

    @Id
    private String id;

    private String title;

    private String description;

    private Date creationDate = new Date(System.currentTimeMillis());

    private String userName;

    private Long likes=0L;

    private Long dislikes=0L;

    @OneToOne(mappedBy = "article" , cascade = CascadeType.REMOVE)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private ArticleImage image;

    @OneToMany(mappedBy = "article" , cascade = CascadeType.REMOVE)
    private List<Comment> comments=new ArrayList<>();

}
