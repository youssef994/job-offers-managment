package com.example.articleservice.Repo;

import com.example.articleservice.entity.Article;
import com.example.articleservice.entity.SavedArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface SavedArticleRpo extends JpaRepository<SavedArticle,Long> {

    @Query(value = "select count(*) from saved_article where article_id=?1 AND user_name=?2",nativeQuery = true)
    int ifSaved(String articleId , String username);
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM saved_article WHERE article_id =?1 AND user_name =?2",nativeQuery = true)
    int deleteX(String articleid, String username);

}
