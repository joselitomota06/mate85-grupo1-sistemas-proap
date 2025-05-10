package br.ufba.proap.filestorage;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FileControllerTest {

    @Mock
    private FileService fileService;

    @InjectMocks
    private FileController fileController;

    @Test
    public void testViewPdf_Success() throws Exception {
        // Arrange
        String fileName = "test.pdf";

        // Create a temporary file
        File tempFile = File.createTempFile("test", ".pdf");
        tempFile.deleteOnExit();

        when(fileService.getPdfByFileName(fileName)).thenReturn(tempFile);

        // Act
        ResponseEntity<InputStreamResource> response = fileController.viewPdf(fileName);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.APPLICATION_PDF, response.getHeaders().getContentType());
        assertTrue(response.getHeaders().getContentDisposition().toString().contains(fileName));
        assertNotNull(response.getBody());
    }

    @Test
    public void testViewPdf_FileNotFound() throws Exception {
        // Arrange
        String fileName = "nonexistent.pdf";
        when(fileService.getPdfByFileName(fileName)).thenThrow(new FileNotFoundException());

        // Act
        ResponseEntity<InputStreamResource> response = fileController.viewPdf(fileName);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    public void testViewPdf_IOException() throws Exception {
        // Arrange
        String fileName = "error.pdf";
        when(fileService.getPdfByFileName(fileName)).thenThrow(new IOException());

        // Act
        ResponseEntity<InputStreamResource> response = fileController.viewPdf(fileName);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNull(response.getBody());
    }
}