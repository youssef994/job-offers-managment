package com.example.articleservice.Repo;


import com.example.articleservice.entity.ArticleImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleImageRepo extends JpaRepository<ArticleImage,Long> {

    @Query(value = "select * from article_image where article_id=?1" ,nativeQuery = true)
    Optional<ArticleImage> getImage(String id);
}
