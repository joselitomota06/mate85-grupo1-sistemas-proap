package br.ufba.proap.configuration;

import org.springframework.mail.javamail.JavaMailSenderImpl;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NoOpMailSender extends JavaMailSenderImpl {
    @Override
    public void send(MimeMessage mimeMessage) {
        try {
            log.info("NoOpMailSender - e-mail descartado → to='{}', subject='{}'",
                    String.join(",", mimeMessage.getAllRecipients()[0].toString()),
                    mimeMessage.getSubject());
        } catch (Exception ex) {
            log.warn("NoOpMailSender: falha ao inspecionar MimeMessage", ex);
        }
    }
}
