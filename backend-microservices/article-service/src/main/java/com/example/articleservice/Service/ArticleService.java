package com.example.articleservice.Service;

import com.example.articleservice.Repo.*;
import com.example.articleservice.entity.*;
import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    ArticleRepo articleRepo;

    @Autowired
    ArticleImageRepo articleImageRepo;

    @Autowired
    LikeRepo likeRepo;

    @Autowired
    DislikeRepo dislikeRepo;

    @Autowired
    CommentRepo commentRepo;

    @Autowired
    SavedArticleRpo savedArticleRpo;

    public void createArticle(String username , Article article){
        article.setUserName(username);
        articleRepo.save(article);
    }

    public void addArticleImage(MultipartFile image, String id) throws IOException {
        Article article=articleRepo.findById(id).get();
        if(articleImageRepo.getImage(id).isPresent()){
            ArticleImage Image=articleImageRepo.getImage(id).get();
            Image.setImageType(image.getContentType());
            Image.setImageData(image.getBytes());
            articleImageRepo.save(Image);
        } else {
            ArticleImage Image = new ArticleImage(image.getContentType(), image.getBytes(), article);
            articleImageRepo.save(Image);
        }
    }
    public ArticleImage getImage(String id) {
        if(articleImageRepo.getImage(id).isPresent()){
            return articleImageRepo.getImage(id).get();
        }else{
            return articleImageRepo.findById(1L).get();
        }
    }

    public List<Article> getPrincipalImage(String username){
        return articleRepo.findByUserName(username);
    }

    public String like(String articleId, String username){
        if(dislikeRepo.getL(articleId,username) != null){
            Dislikes dislikes=dislikeRepo.getL(articleId,username);
            dislikeRepo.delete(dislikes);
            Article article =articleRepo.findById(articleId).get();
            article.setLikes(article.getLikes()+1);
            article.setDislikes(article.getDislikes()-1);
            articleRepo.save(article);
            Likes likes = new Likes();
            likes.setArticleId(articleId);
            likes.setUserName(username);
            likeRepo.save(likes);
            return "ok";
        }else {
            if(likeRepo.getLikeNumber(articleId,username)==0){
                Likes likes = new Likes();
                likes.setUserName(username);
                likes.setArticleId(articleId);
                likeRepo.save(likes);
                Article article =articleRepo.findById(articleId).get();
                article.setLikes(article.getLikes()+1);
                articleRepo.save(article);
                return "ok";
            }else {
                return "no";
            }
        }
    }

    public String dislike(String articleId, String username){
        if(likeRepo.getL(articleId,username) != null){
            Likes likes=likeRepo.getL(articleId,username);
            likeRepo.delete(likes);
            Article article =articleRepo.findById(articleId).get();
            article.setLikes(article.getLikes()-1);
            article.setDislikes(article.getDislikes()+1);
            articleRepo.save(article);
            Dislikes dislikes = new Dislikes();
            dislikes.setArticleId(articleId);
            dislikes.setUserName(username);
            dislikeRepo.save(dislikes);
            return "ok";
        }else {
            if(dislikeRepo.getDislikeNumber(articleId,username)==0){
                Dislikes dislikes=new Dislikes();
                dislikes.setUserName(username);
                dislikes.setArticleId(articleId);
                dislikeRepo.save(dislikes);
                Article article =articleRepo.findById(articleId).get();
                article.setDislikes(article.getDislikes()+1);
                articleRepo.save(article);
                return "ok";
            }else {
                return "no";
            }
        }
    }

    public String addNewComment(String articleId , String username , Comment comment){
        Article article = articleRepo.findById(articleId).get();
        comment.setUserName(username);
        comment.setArticle(article);
        commentRepo.save(comment);
        return "comment saved";
    }

    public String deleteArticle(String id){
        this.articleRepo.deleteById(id);
        return "article deleted";
    }

    public String deleteComment(Long id){
        this.commentRepo.deleteById(id);
        return "comment deleted";
    }

    public String updateComment(Comment c){
        Comment comment = commentRepo.findById(c.getId()).get();
        comment.setText(c.getText());
        commentRepo.save(comment);
        return "comment updated";

    }

    public String updateArticle(Article a){
        Article article = articleRepo.findById(a.getId()).get();
        article.setTitle(a.getTitle());
        article.setDescription(a.getDescription());
        articleRepo.save(article);
        return "article updated";
    }


    public List<Article> getAllArticles(){
        return articleRepo.findAll();
    }

    public String savedArticle(String articleId , String username){
        if(savedArticleRpo.ifSaved(articleId,username)==0){
            SavedArticle savedArticle = new SavedArticle();
            savedArticle.setArticleId(articleId);
            savedArticle.setUserName(username);
            savedArticleRpo.save(savedArticle);
            return "article saved";
        }else {
            return "already saved";
        }
    }

    public List<Article> getPrincipalSavedArticle(String username){
        return articleRepo.getSavedArticle(username);
    }

    public String deleteSavedArticle(String articleId , String username){
        savedArticleRpo.deleteX(articleId,username);
        return "deleted";
    }

}
