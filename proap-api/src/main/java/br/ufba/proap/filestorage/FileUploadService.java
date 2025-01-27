package br.ufba.proap.filestorage;

import java.io.File;
import java.io.IOException;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileUploadService {
    @Value("${file.upload-dir}")
    private String uploadDir;

    private static final String PDF_EXTENSION = ".pdf";

    private static final String PDF_DIRECTORY = "/pdf";

    public String uploadPdf(MultipartFile file) throws IOException {
        // Valida extensão
        String originalFileName = file.getOriginalFilename();
        if (!isPdfFile(originalFileName)) {
            throw new IllegalArgumentException("Somente arquivos PDF são permitidos.");
        }

        // Gera filename único
        String fileName = generateUniqueFileName() + PDF_EXTENSION;

        // Cria diretório se não existir
        File directory = new File(uploadDir + PDF_DIRECTORY);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Salva o arquivo
        File destFile = new File(directory, fileName);
        file.transferTo(destFile);

        // Retorna o nome do arquivo salvo
        return fileName;
    }

    private boolean isPdfFile(String filename) {
        return (filename != null && filename.toLowerCase().endsWith(".pdf"));
    }

    private String generateUniqueFileName() {
        long timestamp = System.currentTimeMillis();
        int randomInt = new Random().nextInt(1000);
        return timestamp + "_" + randomInt;
    }
}
