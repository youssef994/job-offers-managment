package com.example.articleservice.Controller;


import com.example.articleservice.Repo.ArticleRepo;
import com.example.articleservice.Service.ArticleService;
import com.example.articleservice.entity.Article;
import com.example.articleservice.entity.ArticleImage;
import com.example.articleservice.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/article")
public class articleController {

    @Autowired
    ArticleService articleService;


    @PostMapping("/addarticle/{username}")
    public String addNewArticle(@PathVariable(value = "username") String username , @RequestBody Article article){
        articleService.createArticle(username,article);
        return "article saved";
    }

    @PostMapping("/addimage/{id}")
    public void addImage(@RequestParam ("image") MultipartFile image , @PathVariable(value = "id") String id) throws IOException {
        articleService.addArticleImage(image,id);
    }

    @GetMapping("/getimage/{id}")
    public ResponseEntity<byte[]> getImgae(@PathVariable (value = "id") String id) {
        ArticleImage image=articleService.getImage(id);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(image.getImageType()))
                .body(image.getImageData());
    }

    @GetMapping("/getprincipalarticle/{username}")
    public List<Article> getPrincipalArticle(@PathVariable(value = "username") String userName){
        return this.articleService.getPrincipalImage(userName);
    }

    @PostMapping("/like/{articleId}/{username}")
    public String likeArticle(@PathVariable(value = "articleId") String articleId,@PathVariable(value = "username") String userName){
        return articleService.like(articleId,userName);
    }

    @PostMapping("/dislike/{articleId}/{username}")
    public String dislikeArticle(@PathVariable(value = "articleId") String articleId,@PathVariable(value = "username") String userName){
        return articleService.dislike(articleId,userName);
    }

    @PostMapping("/addcomment/{articleId}/{username}")
    public String addComment(@PathVariable(value = "articleId") String articleId, @PathVariable(value = "username") String userName, @RequestBody Comment comment){
        return articleService.addNewComment(articleId,userName,comment);
    }

    @DeleteMapping("/deletearticle/{id}")
    public String deleteArticle(@PathVariable(value = "id") String id){
        return articleService.deleteArticle(id);
    }

    @DeleteMapping("/deletecomment/{id}")
    public String deleteArticle(@PathVariable(value = "id") Long id){
        return articleService.deleteComment(id);
    }

    @PutMapping("/updatecomment")
    public String updateComment(@RequestBody Comment comment){
        return articleService.updateComment(comment);
    }

    @PutMapping("/updatearticle")
    public String updateArticle(@RequestBody Article article){
        return articleService.updateArticle(article);
    }

    @GetMapping("/getallarticle")
    public List<Article> getall(){
        return articleService.getAllArticles();
    }

    @PostMapping("/savearticle/{articleId}/{username}")
    public String saveArticle(@PathVariable(value = "articleId") String articleId, @PathVariable(value = "username") String userName){
        return articleService.savedArticle(articleId,userName);
    }

    @GetMapping("/getprincipalsavedarticle/{username}")
    public List<Article> getPrincipalSavedArticle( @PathVariable(value = "username") String userName){
        return articleService.getPrincipalSavedArticle(userName);
    }

    @DeleteMapping("/deletesavedarticle/{id}/{username}")
    public String deleteSavedArticle(@PathVariable(value = "id") String id,@PathVariable(value = "username") String username){
        return articleService.deleteSavedArticle(id,username);
    }
}
