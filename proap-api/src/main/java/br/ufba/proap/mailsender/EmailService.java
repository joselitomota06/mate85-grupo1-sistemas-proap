package br.ufba.proap.mailsender;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import br.ufba.proap.mailsender.dto.EmailDTO;
import br.ufba.proap.mailsender.template.EmailTemplateBuilder;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailTemplateBuilder emailTemplateBuilder;

    public void sendEmail(EmailDTO email) {
        var message = new SimpleMailMessage();
        message.setFrom("noreply@email.com");
        message.setTo(email.to());
        message.setSubject(email.subject());
        message.setText(email.body());
        mailSender.send(message);
    }

    public void sendTestEmail(String to, String username) {
        try {

            Map<String, Object> variables = Map.of(
                    "username", username);
            String htmlContent = emailTemplateBuilder.buildEmail("email/test-email", variables);

            // Criando mensagem
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("📩 Teste de E-mail - PROAP");
            helper.setText(htmlContent, true); // HTML ativado

            mailSender.send(message);
            log.info("Enviando e-mail para {}", to);

        } catch (Exception e) {
            log.error("Erro ao enviar e-mail: " + e.getMessage());
        }
    }

    @Async
    public void sendTemplateEmail(String to, String subject, String templateName, Map<String, Object> variables) {

        try {
            String htmlContent = emailTemplateBuilder.buildEmail("email/" + templateName, variables);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            mailSender.send(message);
            log.info("Enviando e-mail para {}", to);

        } catch (Exception e) {
            log.error("Erro ao enviar e-mail: " + e.getMessage());
        }
    }

}
