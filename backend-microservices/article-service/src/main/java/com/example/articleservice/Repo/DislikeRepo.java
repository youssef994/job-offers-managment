package com.example.articleservice.Repo;

import com.example.articleservice.entity.Dislikes;
import com.example.articleservice.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DislikeRepo extends JpaRepository<Dislikes,Long> {

    @Query(value = "select count(*) from dislikes where article_id=?1 AND user_name=?2",nativeQuery = true)
    int getDislikeNumber(String idArticle, String userName);

    @Query(value = "select * from dislikes where article_id=?1 AND user_name=?2",nativeQuery = true)
    Dislikes getL(String idArticle, String userName);
}
