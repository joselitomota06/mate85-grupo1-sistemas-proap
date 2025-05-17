package br.ufba.proap.solicitationadminpanel.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import br.ufba.proap.solicitationadminpanel.domain.dto.CeapgResponseDTO;
import br.ufba.proap.solicitationadminpanel.service.CeapgService;

@ExtendWith(MockitoExtension.class)
public class CeapgControllerTest {

    @Mock
    private CeapgService ceapgService;

    @InjectMocks
    private CeapgController ceapgController;

    @Test
    public void validateDate_NullParams_ReturnsDefaultDates() {
        Pair<LocalDate, LocalDate> result = ceapgController.validateDate(null, null);

        LocalDate expectedStart = LocalDate.of(LocalDate.now().getYear(), 1, 1);
        LocalDate expectedEnd = LocalDate.now();

        assertEquals(expectedStart, result.getFirst());
        assertEquals(expectedEnd, result.getSecond());
    }

    @Test
    public void validateDate_WithParams_ReturnsParsedDates() {
        String startDate = "01-02-2023";
        String endDate = "10-03-2023";

        Pair<LocalDate, LocalDate> result = ceapgController.validateDate(startDate, endDate);

        LocalDate expectedStart = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate expectedEnd = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        assertEquals(expectedStart, result.getFirst());
        assertEquals(expectedEnd, result.getSecond());
    }

    @Test
    public void getAllCeapgRequests_NoParams_CallsServiceWithDefaultDates() {
        List<CeapgResponseDTO> mockResponse = new ArrayList<>();
        when(ceapgService.getCeapgRequests(any(LocalDate.class), any(LocalDate.class))).thenReturn(mockResponse);

        ResponseEntity<?> response = ceapgController.getAllCeapgRequests(null, null);

        verify(ceapgService).getCeapgRequests(any(LocalDate.class), any(LocalDate.class));
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponse, response.getBody());
    }

    @Test
    public void getAllCeapgRequests_WithParams_CallsServiceWithParsedDates() {
        String startDate = "01-02-2023";
        String endDate = "10-03-2023";
        List<CeapgResponseDTO> mockResponse = new ArrayList<>();

        LocalDate parsedStart = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate parsedEnd = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        when(ceapgService.getCeapgRequests(parsedStart, parsedEnd)).thenReturn(mockResponse);

        ResponseEntity<?> response = ceapgController.getAllCeapgRequests(startDate, endDate);

        verify(ceapgService).getCeapgRequests(parsedStart, parsedEnd);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponse, response.getBody());
    }

    @Test
    public void getPendingCeapgRequests_NoParams_CallsServiceWithDefaultDates() {
        List<CeapgResponseDTO> mockResponse = new ArrayList<>();
        when(ceapgService.getPendingCeapgRequests(any(LocalDate.class), any(LocalDate.class))).thenReturn(mockResponse);

        ResponseEntity<?> response = ceapgController.getPendingCeapgRequests(null, null);

        verify(ceapgService).getPendingCeapgRequests(any(LocalDate.class), any(LocalDate.class));
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponse, response.getBody());
    }

    @Test
    public void getPendingCeapgRequests_WithParams_CallsServiceWithParsedDates() {
        String startDate = "01-02-2023";
        String endDate = "10-03-2023";
        List<CeapgResponseDTO> mockResponse = new ArrayList<>();

        LocalDate parsedStart = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate parsedEnd = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        when(ceapgService.getPendingCeapgRequests(parsedStart, parsedEnd)).thenReturn(mockResponse);

        ResponseEntity<?> response = ceapgController.getPendingCeapgRequests(startDate, endDate);

        verify(ceapgService).getPendingCeapgRequests(parsedStart, parsedEnd);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponse, response.getBody());
    }

    @Test
    public void getCompletedCeapgRequests_NoParams_CallsServiceWithDefaultDates() {
        List<CeapgResponseDTO> mockResponse = new ArrayList<>();
        when(ceapgService.getCompletedCeapgRequests(any(LocalDate.class), any(LocalDate.class)))
                .thenReturn(mockResponse);

        ResponseEntity<?> response = ceapgController.getCompletedCeapgRequests(null, null);

        verify(ceapgService).getCompletedCeapgRequests(any(LocalDate.class), any(LocalDate.class));
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponse, response.getBody());
    }

    @Test
    public void getCompletedCeapgRequests_WithParams_CallsServiceWithParsedDates() {
        String startDate = "01-02-2023";
        String endDate = "10-03-2023";
        List<CeapgResponseDTO> mockResponse = new ArrayList<>();

        LocalDate parsedStart = LocalDate.parse(startDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        LocalDate parsedEnd = LocalDate.parse(endDate, DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        when(ceapgService.getCompletedCeapgRequests(parsedStart, parsedEnd)).thenReturn(mockResponse);

        ResponseEntity<?> response = ceapgController.getCompletedCeapgRequests(startDate, endDate);

        verify(ceapgService).getCompletedCeapgRequests(parsedStart, parsedEnd);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponse, response.getBody());
    }
}