package br.ufba.proap.filestorage;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class FileServiceTest {

    @InjectMocks
    private FileService fileService;

    private String tempDir;

    @BeforeEach
    public void setup() throws IOException {
        Path tempPath = Files.createTempDirectory("file-service-test");
        tempDir = tempPath.toString();
        ReflectionTestUtils.setField(fileService, "uploadDir", tempDir);
    }

    @Test
    public void testUploadPdf_WithValidPdfFile_ShouldSucceed() throws IOException {
        // Arrange
        byte[] content = "PDF Content".getBytes();
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.pdf", "application/pdf", content);

        // Act
        String fileName = fileService.uploadPdf(mockFile);

        // Assert
        assertNotNull(fileName);
        assertTrue(fileName.endsWith(".pdf"));

        // Verify file was saved
        File savedFile = new File(tempDir + "/pdf/" + fileName);
        assertTrue(savedFile.exists());
    }

    @Test
    public void testUploadPdf_WithNonPdfFile_ShouldThrowException() {
        // Arrange
        byte[] content = "File Content".getBytes();
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.txt", "text/plain", content);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> fileService.uploadPdf(mockFile));
        assertEquals("Somente arquivos PDF são permitidos.", exception.getMessage());
    }

    @Test
    public void testUploadPdf_CreatesDirectoryIfNotExists() throws IOException {
        // Arrange
        byte[] content = "PDF Content".getBytes();
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.pdf", "application/pdf", content);

        // Delete directory if exists
        File directory = new File(tempDir + "/pdf");
        if (directory.exists()) {
            directory.delete();
        }
        assertFalse(directory.exists());

        // Act
        fileService.uploadPdf(mockFile);

        // Assert
        assertTrue(directory.exists());
    }

    @Test
    public void testGenerateUniqueFileName_ShouldReturnDifferentNames() throws Exception {
        // Arrange
        byte[] content = "PDF Content".getBytes();
        MockMultipartFile mockFile1 = new MockMultipartFile(
                "file", "test1.pdf", "application/pdf", content);
        MockMultipartFile mockFile2 = new MockMultipartFile(
                "file", "test2.pdf", "application/pdf", content);

        // Act
        String fileName1 = fileService.uploadPdf(mockFile1);
        String fileName2 = fileService.uploadPdf(mockFile2);

        // Assert
        assertNotEquals(fileName1, fileName2);
    }

    @Test
    public void testGetPdfByFileName_WithExistingFile_ShouldReturnFile() throws IOException {
        // Arrange
        byte[] content = "PDF Content".getBytes();
        MockMultipartFile mockFile = new MockMultipartFile(
                "file", "test.pdf", "application/pdf", content);
        String fileName = fileService.uploadPdf(mockFile);

        // Act
        File retrievedFile = fileService.getPdfByFileName(fileName);

        // Assert
        assertNotNull(retrievedFile);
        assertTrue(retrievedFile.exists());
    }

    @Test
    public void testGetPdfByFileName_WithNonExistingFile_ShouldThrowException() {
        // Arrange
        String nonExistingFileName = "non-existing-file.pdf";

        // Act & Assert
        FileNotFoundException exception = assertThrows(FileNotFoundException.class,
                () -> fileService.getPdfByFileName(nonExistingFileName));
        assertTrue(exception.getMessage().contains("não encontrado"));
    }
}