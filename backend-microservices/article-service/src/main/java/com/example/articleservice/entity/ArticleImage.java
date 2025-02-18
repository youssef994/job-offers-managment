package com.example.articleservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class ArticleImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="imageId")
    private Long ID;

    @Column(name="imagetype")
    private String imageType;

    @Lob
    @Column(name="imagedata")
    private  byte[] imageData;

    @OneToOne
    @JoinColumn(name = "article_id")
    private Article article;


    public ArticleImage(String imagetype,byte[] imagedata , Article article){
        this.imageType=imagetype;
        this.imageData=imagedata;
        this.article=article;
    }
}
