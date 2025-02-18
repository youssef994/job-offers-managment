package com.slim.identityService.service;

import com.slim.identityService.model.UserCredential;
import com.slim.identityService.model.UserRole;
import com.slim.identityService.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    UserCredentialRepository userCredentialRepository;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private JavaMailSender javaMailSender;

    public UserCredential registerUser(UserCredential user) {
        Optional<UserCredential> userUsername = userCredentialRepository.findByUsername(user.getUsername());
        Optional<UserCredential> userEmail = userCredentialRepository.findByEmail(user.getEmail());
        if (userUsername.isPresent()) {
            throw new RuntimeException("Username taken.");
        }
        if (userEmail.isPresent()) {
            throw new RuntimeException("Email taken.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setIsActive(false);
        user.setVerificationCode(generateNumericCode(6));
        UserCredential savedUser = userCredentialRepository.save(user);
        sendVerificationEmail(savedUser.getEmail(), savedUser.getVerificationCode());

        return userCredentialRepository.save(user);
    }
    @Async
    public void sendVerificationEmail(String email, String code) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(email);
        mailMessage.setSubject("Email Verification");
        mailMessage.setText("Your verification code is: " + code);
        javaMailSender.send(mailMessage);
    }
    public boolean verifyEmail(String code) {
        Optional<UserCredential> user = userCredentialRepository.findByVerificationCode(code);
        if (user.isPresent()) {
            UserCredential verifiedUser = user.get();
            verifiedUser.setIsVerified(true);
            verifiedUser.setIsActive(true);
            verifiedUser.setVerificationCode(null);
            userCredentialRepository.save(verifiedUser);
            return true;
        }
        return false;
    }
    public String generateToken(String username) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        return jwtService.generateToken(userDetails);
    }


    public Optional<UserCredential> getUserByUsername(String username) {
        return userCredentialRepository.findByUsername(username);
    }

    private String generateNumericCode(int length) {
        int number = (int) (Math.random() * Math.pow(10, length));
        return String.format("%0" + length + "d", number);
    }
    public void validate(String token) {
        jwtService.validateToken(token);
    }

    public Optional<UserCredential> getUserById(Integer id) {
        return userCredentialRepository.findById(id);
    }

    public List<UserCredential> getAllUsersByRole(UserRole role) {
        return userCredentialRepository.findByRole(role);
    }

    public void deleteUser(int id) {
        userCredentialRepository.deleteById(id);
    }
}
