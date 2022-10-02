package br.ufba.proap.errors;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice()
public class ExceptionHandler extends ResponseEntityExceptionHandler {


    public ResponseEntity handleValidationException(
            MethodArgumentNotValidException ex
    ) {
        String message = ex.getBindingResult()
                .getAllErrors()
                .get(0)
                .getDefaultMessage();

        return buildResponse(new ErrorResponse(
                HttpStatus.UNPROCESSABLE_ENTITY, message
        ));
    }

    private ResponseEntity buildResponse(ErrorResponse errorResponse) {
        return ResponseEntity
                .status(errorResponse.getStatus())
                .body(errorResponse);
    }
}
