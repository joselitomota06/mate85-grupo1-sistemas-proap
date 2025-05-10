package br.ufba.proap.mailsender;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;
import br.ufba.proap.mailsender.template.EmailTemplateBuilder;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

class EmailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private EmailTemplateBuilder emailTemplateBuilder;

    @InjectMocks
    private EmailService emailService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSendTemplateEmail() throws MessagingException {
        // Arrange
        String to = "test@example.com";
        String subject = "Template Subject";
        String templateName = "test-template";
        Map<String, Object> variables = Map.of("key", "value");
        MimeMessage mimeMessage = mock(MimeMessage.class);

        when(mailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(emailTemplateBuilder.buildEmail(eq("email/" + templateName), any()))
                .thenReturn("<html>Template email</html>");

        // Act
        emailService.sendTemplateEmail(to, subject, templateName, variables);

        // Assert
        verify(mailSender, times(1)).send(eq(mimeMessage));
        verify(emailTemplateBuilder, times(1)).buildEmail(eq("email/" + templateName), any());
    }

    @Test
    void testSendTemplateEmailHandlesException() throws MessagingException {
        // Arrange
        String to = "test@example.com";
        String subject = "Template Subject";
        String templateName = "test-template";
        Map<String, Object> variables = Map.of("key", "value");

        when(emailTemplateBuilder.buildEmail(anyString(), any())).thenThrow(new RuntimeException("Test exception"));

        // Act - this should not throw exception due to try-catch in the method
        emailService.sendTemplateEmail(to, subject, templateName, variables);

        // Assert - no exception thrown and mail is not sent
        verify(mailSender, times(0)).send(any(MimeMessage.class));
    }

    @Test
    void testSendTestEmailHandlesException() throws MessagingException {
        // Arrange
        String to = "test@example.com";
        String username = "Test User";

        when(emailTemplateBuilder.buildEmail(anyString(), any())).thenThrow(new RuntimeException("Test exception"));

        // Act - this should not throw exception due to try-catch in the method
        emailService.sendTestEmail(to, username);

        // Assert - no exception thrown and mail is not sent
        verify(mailSender, times(0)).send(any(MimeMessage.class));
    }
}