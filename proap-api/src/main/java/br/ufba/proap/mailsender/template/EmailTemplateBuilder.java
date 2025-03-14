package br.ufba.proap.mailsender.template;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailTemplateBuilder {
    private final TemplateEngine templateEngine;

    public EmailTemplateBuilder(TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
    }

    public String buildEmail(String templateName, Map<String, Object> variables) {
        Context context = new Context();
        context.setVariables(variables);
        return templateEngine.process(templateName, context);
    }
}
