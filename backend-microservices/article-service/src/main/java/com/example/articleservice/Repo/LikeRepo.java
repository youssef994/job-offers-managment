package com.example.articleservice.Repo;

import com.example.articleservice.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepo extends JpaRepository<Likes, Long> {

    @Query(value = "select count(*) from likes where article_id=?1 AND user_name=?2",nativeQuery = true)
    int getLikeNumber(String idArticle, String userName);

    @Query(value = "select * from likes where article_id=?1 AND user_name=?2",nativeQuery = true)
    Likes getL(String idArticle, String userName);
}
