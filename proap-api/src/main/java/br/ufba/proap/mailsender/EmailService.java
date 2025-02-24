package br.ufba.proap.mailsender;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import br.ufba.proap.mailsender.dto.EmailDTO;
import br.ufba.proap.mailsender.template.EmailTemplateService;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailTemplateService emailTemplateService;

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
            String htmlContent = emailTemplateService.buildEmail("email/test-email", variables);

            // Criando mensagem
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject("📩 Teste de E-mail - PROAP");
            helper.setText(htmlContent, true); // HTML ativado

            mailSender.send(message);
            System.out.println("E-mail enviado com sucesso para " + to);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
