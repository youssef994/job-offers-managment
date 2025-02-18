package com.example.articleservice.Repo;

import com.example.articleservice.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepo extends JpaRepository <Article,String> {

    @Query(value ="select * from article where id IN (select article_id from saved_article where user_name=?1)" ,nativeQuery = true)
    List<Article> getSavedArticle(String userName);
    List<Article> findByUserName(String userName);
}
