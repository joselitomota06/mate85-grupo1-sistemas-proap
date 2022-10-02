package br.ufba.proap.errors;

import org.springframework.http.HttpStatus;

public class ErrorResponse {
    private HttpStatus status;

    public HttpStatus getStatus() {
        return status;
    }

    private String message;

    public String getMessage() {
        return message;
    }

    public ErrorResponse(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
