package br.ufba.proap.assistancerequest.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;
import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.*;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;
import br.ufba.proap.assistancerequest.domain.Review;
import br.ufba.proap.assistancerequest.domain.dto.*;
import br.ufba.proap.assistancerequest.service.*;
import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.authentication.domain.Perfil;
import br.ufba.proap.authentication.service.UserService;
import br.ufba.proap.exception.UnauthorizedException;
import br.ufba.proap.filestorage.FileService;

class AssistanceRequestControllerTest {

    @Mock
    private AssistanceRequestService service;
    @Mock
    private ReviewService reviewService;
    @Mock
    private UserService userService;
    @Mock
    private FileService fileService;

    @InjectMocks
    private AssistanceRequestController controller;

    private MockMvc mvc;
    private User mockUser;
    private User adminUser;
    private ObjectMapper objectMapper;
    private AssistanceRequest mockRequest;

    @BeforeEach
    void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
        mvc = MockMvcBuilders.standaloneSetup(controller).build();

        Perfil mockPerfil = Mockito.mock(Perfil.class);
        when(mockPerfil.getId()).thenReturn(1L);
        when(mockPerfil.getName()).thenReturn("TestPerfil");
        when(mockPerfil.hasPermission(anyString())).thenReturn(false);

        Perfil adminPerfil = Mockito.mock(Perfil.class);
        when(adminPerfil.getId()).thenReturn(2L);
        when(adminPerfil.getName()).thenReturn("AdminPerfil");
        when(adminPerfil.hasPermission("VIEW_ALL_REQUESTS")).thenReturn(true);
        when(adminPerfil.hasPermission("APPROVE_REQUEST")).thenReturn(true);

        mockUser = new User("Usuario Teste", "owner@ufba.br", "password");
        setPrivateField(mockUser, "id", 1L);
        mockUser.setPerfil(mockPerfil);

        adminUser = new User("Admin Teste", "admin@ufba.br", "password");
        setPrivateField(adminUser, "id", 2L);
        adminUser.setPerfil(adminPerfil);

        mockRequest = new AssistanceRequest();
        setPrivateField(mockRequest, "id", 1L);
        setPrivateField(mockRequest, "tituloPublicacao", "Teste");
        setPrivateField(mockRequest, "situacao", 0);
        setPrivateField(mockRequest, "user", mockUser);

        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    private void setPrivateField(Object target, String fieldName, Object value) throws Exception {
        Field field = target.getClass().getDeclaredField(fieldName);
        field.setAccessible(true);
        field.set(target, value);
    }

    @Test
    @DisplayName("GET /assistancerequest/list returns 401 when user not logged")
    void list_shouldReturn401_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/list")
                .param("sortBy", "createdAt")
                .param("ascending", "true")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.list", hasSize(0)));
    }

    @Test
    @DisplayName("GET /assistancerequest/list returns 200 and data when user logged in")
    void list_shouldReturnData_whenUserLoggedIn() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);

        AssistanceRequestService.AssistanceRequestListFiltered result = new AssistanceRequestService.AssistanceRequestListFiltered(
                Collections.singletonList(Mockito.mock(ResponseAssistanceRequestDTO.class)),
                1);

        when(service.find(eq("createdAt"), eq(true), eq(0), eq(10), eq(mockUser)))
                .thenReturn(result);

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/list")
                .param("sortBy", "createdAt")
                .param("ascending", "true")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.list", hasSize(1)))
                .andExpect(jsonPath("$.total", is(1)));
    }

    @Test
    @DisplayName("GET /assistancerequest/list/{userId} returns user's requests")
    void listById_shouldReturnUserRequests() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);

        List<AssistanceRequest> requests = new ArrayList<>();
        requests.add(mockRequest);

        when(service.findByUser(mockUser)).thenReturn(requests);

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/list/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    @DisplayName("GET /assistancerequest/list/{userId} returns empty list when user not logged")
    void listById_shouldReturnEmptyList_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/list/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));

        verify(service, never()).findByUser(any());
    }

    @Test
    @DisplayName("GET /assistancerequest/find/{id} returns 200 when user is owner")
    void findById_shouldReturnRequest_whenUserIsOwner() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(service.findById(1L)).thenReturn(Optional.of(mockRequest));

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/find/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /assistancerequest/find/{id} returns 200 when user has permission")
    void findById_shouldReturnRequest_whenUserHasPermission() throws Exception {
        when(userService.getLoggedUser()).thenReturn(adminUser);
        when(service.findById(1L)).thenReturn(Optional.of(mockRequest));

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/find/1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /assistancerequest/find/{id} returns 401 when user not logged")
    void findById_shouldReturn401_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/find/1"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /assistancerequest/find/{id} returns 404 when request not found")
    void findById_shouldReturn404_whenRequestNotFound() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(service.findById(1L)).thenReturn(Optional.empty());

        mvc.perform(MockMvcRequestBuilders.get("/assistancerequest/find/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST /assistancerequest/create creates request successfully")
    void create_shouldCreateRequest() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(service.save(any(AssistanceRequest.class))).thenReturn(mockRequest);

        AssistanceRequest newRequest = new AssistanceRequest();

        mvc.perform(MockMvcRequestBuilders.post("/assistancerequest/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newRequest)))
                .andExpect(status().isOk());

        verify(service).save(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("POST /assistancerequest/create returns 400 when user not logged")
    void create_shouldReturn400_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        AssistanceRequest newRequest = new AssistanceRequest();

        mvc.perform(MockMvcRequestBuilders.post("/assistancerequest/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newRequest)))
                .andExpect(status().isBadRequest());

        verify(service, never()).save(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("POST /assistancerequest/create returns 400 when request is invalid")
    void createWithFile_shouldUploadPdf() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(fileService.uploadPdf(any())).thenReturn("123.pdf");

        when(service.save(any(AssistanceRequest.class))).thenAnswer(invocation -> {
            AssistanceRequest req = invocation.getArgument(0);
            setPrivateField(req, "id", 1L);
            return req;
        });

        CreateAssistanceRequestDTO dto = new CreateAssistanceRequestDTO(
                "Titulo", List.of(), false, true, "Prof", "Disc",
                true, 0, "CONF", false, LocalDate.now(), LocalDate.now().plusDays(2),
                false, 0, "", "Cidade", "BR", "", "Modal",
                BigDecimal.ZERO, "", 0, BigDecimal.ZERO, false, false,
                BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, "Just");

        MockMultipartFile form = new MockMultipartFile("form", "", "application/json",
                objectMapper.writeValueAsBytes(dto));
        MockMultipartFile pdf = new MockMultipartFile("file", "file.pdf", "application/pdf", "dummy".getBytes());

        mvc.perform(MockMvcRequestBuilders.multipart("/assistancerequest/create-with-file")
                .file(form)
                .file(pdf)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());

        verify(fileService).uploadPdf(any());
        verify(service).save(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("POST /assistancerequest/create-with-file returns 415 when file is not PDF")
    void createWithFile_shouldReturn415_whenNotPdf() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(fileService.uploadPdf(any()))
                .thenThrow(new IllegalArgumentException("Somente arquivos PDF são permitidos"));

        MockMultipartFile form = new MockMultipartFile("form", "", "application/json", "{}".getBytes());
        MockMultipartFile txt = new MockMultipartFile("file", "file.txt", "text/plain", "oops".getBytes());

        mvc.perform(MockMvcRequestBuilders.multipart("/assistancerequest/create-with-file")
                .file(form)
                .file(txt)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isUnsupportedMediaType());
    }

    @Test
    @DisplayName("PUT /assistancerequest/update updates request when user is owner")
    void update_shouldUpdateRequest_whenUserIsOwner() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);

        AssistanceRequest existingRequest = new AssistanceRequest();
        setPrivateField(existingRequest, "id", 1L);
        setPrivateField(existingRequest, "user", mockUser);
        setPrivateField(existingRequest, "situacao", 0);

        ResponseAssistanceRequestDTO requestDto = Mockito.mock(ResponseAssistanceRequestDTO.class);
        when(requestDto.id()).thenReturn(1L);
        when(requestDto.situacao()).thenReturn(0);
        when(requestDto.toEntity()).thenReturn(existingRequest);

        when(service.findById(1L)).thenReturn(Optional.of(existingRequest));
        when(service.save(any(AssistanceRequest.class))).thenReturn(existingRequest);

        MockMultipartFile form = new MockMultipartFile("form", "", "application/json",
                objectMapper.writeValueAsBytes(requestDto));

        mvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT, "/assistancerequest/update")
                .file(form)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());

        verify(service).save(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/update returns 403 when user not authorized")
    void update_shouldReturn403_whenUserNotAuthorized() throws Exception {

        User otherUser = new User("Other User", "other@ufba.br", "password");
        setPrivateField(otherUser, "id", 3L);
        otherUser.setPerfil(Mockito.mock(Perfil.class));

        when(userService.getLoggedUser()).thenReturn(otherUser);

        AssistanceRequest existingRequest = new AssistanceRequest();
        setPrivateField(existingRequest, "id", 1L);
        setPrivateField(existingRequest, "user", mockUser);
        setPrivateField(existingRequest, "situacao", 0);

        ResponseAssistanceRequestDTO requestDto = Mockito.mock(ResponseAssistanceRequestDTO.class);
        when(requestDto.id()).thenReturn(1L);

        when(service.findById(1L)).thenReturn(Optional.of(existingRequest));

        MockMultipartFile form = new MockMultipartFile("form", "", "application/json",
                objectMapper.writeValueAsBytes(requestDto));

        mvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.PUT, "/assistancerequest/update")
                .file(form)
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isForbidden());

        verify(service, never()).save(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/reviewsolicitation reviews request successfully")
    void reviewSolicitation_shouldReviewRequest() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(service.reviewSolicitation(any(AssistanceRequest.class), eq(mockUser)))
                .thenReturn(mockRequest);

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/reviewsolicitation")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isOk());

        verify(service).reviewSolicitation(any(AssistanceRequest.class), eq(mockUser));
    }

    @Test
    @DisplayName("PUT /assistancerequest/reviewsolicitation returns 400 when user not logged")
    void reviewSolicitation_shouldReturn400_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/reviewsolicitation")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isBadRequest());

        verify(service, never()).reviewSolicitation(any(AssistanceRequest.class), any(User.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/reviewsolicitation returns 404 when request not found")
    void reviewSolicitation_shouldReturn404_whenRequestNotFound() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(service.reviewSolicitation(any(AssistanceRequest.class), eq(mockUser)))
                .thenReturn(null);

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/reviewsolicitation")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("DELETE /assistancerequest/remove/{id} removes request successfully")
    void remove_shouldRemoveRequest() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(service.findById(1L)).thenReturn(Optional.of(mockRequest));

        mvc.perform(MockMvcRequestBuilders.delete("/assistancerequest/remove/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Successfully removed"));

        verify(service).delete(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("DELETE /assistancerequest/remove/{id} returns 401 when user not logged")
    void remove_shouldReturn401_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        mvc.perform(MockMvcRequestBuilders.delete("/assistancerequest/remove/1"))
                .andExpect(status().isUnauthorized());

        verify(service, never()).delete(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("DELETE /assistancerequest/remove/{id} returns 404 when request not found")
    void remove_shouldReturn404_whenRequestNotFound() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);
        when(service.findById(1L)).thenReturn(Optional.empty());

        mvc.perform(MockMvcRequestBuilders.delete("/assistancerequest/remove/1"))
                .andExpect(status().isNotFound());

        verify(service, never()).delete(any(AssistanceRequest.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/approve/{requestId} approves request successfully")
    void approveRequest_shouldApproveRequest() throws Exception {
        when(userService.getLoggedUser()).thenReturn(adminUser);

        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.numeroAta = "123/2023";
        reviewDTO.numeroDiariasAprovadas = 3;
        reviewDTO.observacao = "Aprovado";

        Review approvedReview = new Review();
        setPrivateField(approvedReview, "id", 1L);

        when(reviewService.approve(any(ReviewDTO.class))).thenReturn(approvedReview);

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/approve/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reviewDTO)))
                .andExpect(status().isOk());

        verify(reviewService).approve(any(ReviewDTO.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/approve/{requestId} returns 400 when user not logged")
    void approveRequest_shouldReturn400_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        ReviewDTO reviewDTO = new ReviewDTO();

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/approve/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reviewDTO)))
                .andExpect(status().isBadRequest());

        verify(reviewService, never()).approve(any(ReviewDTO.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/reprove/{requestId} reproves request successfully")
    void reproveRequest_shouldReproveRequest() throws Exception {
        when(userService.getLoggedUser()).thenReturn(adminUser);

        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.numeroAta = "123/2023";
        reviewDTO.observacao = "Reprovado por documentação incompleta";

        Review reprovedReview = new Review();
        setPrivateField(reprovedReview, "id", 1L);

        when(reviewService.reprove(any(ReviewDTO.class))).thenReturn(reprovedReview);

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/reprove/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reviewDTO)))
                .andExpect(status().isOk());

        verify(reviewService).reprove(any(ReviewDTO.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/reprove/{requestId} returns 400 when user not logged")
    void reproveRequest_shouldReturn400_whenNoUser() throws Exception {
        when(userService.getLoggedUser()).thenReturn(null);

        ReviewDTO reviewDTO = new ReviewDTO();

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/reprove/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(reviewDTO)))
                .andExpect(status().isBadRequest());

        verify(reviewService, never()).reprove(any(ReviewDTO.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/{id}/ceapg updates CEAPG fields successfully")
    void updateCeapgFields_shouldUpdateFields() throws Exception {

        when(userService.getLoggedUser()).thenReturn(adminUser);

        AssistanceRequestCeapgDTO ceapgDTO = new AssistanceRequestCeapgDTO();
        ceapgDTO.setCustoFinalCeapg(BigDecimal.valueOf(500));
        ceapgDTO.setObservacoesCeapg("Aprovado pelo CEAPG");

        AssistanceRequest updatedRequest = new AssistanceRequest();
        setPrivateField(updatedRequest, "id", 1L);
        setPrivateField(updatedRequest, "custoFinalCeapg", BigDecimal.valueOf(500));
        setPrivateField(updatedRequest, "observacoesCeapg", "Aprovado pelo CEAPG");
        setPrivateField(updatedRequest, "user", mockUser);

        when(service.updateCeapgFields(eq(1L), any(AssistanceRequestCeapgDTO.class)))
                .thenReturn(updatedRequest);

        mvc = MockMvcBuilders.standaloneSetup(controller).build();

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/1/ceapg")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ceapgDTO)))
                .andExpect(status().isOk());

        verify(service).updateCeapgFields(eq(1L), any(AssistanceRequestCeapgDTO.class));
    }

    @Test
    @DisplayName("PUT /assistancerequest/{id}/ceapg returns 403 when user not authorized")
    void updateCeapgFields_shouldReturn403_whenNotAuthorized() throws Exception {
        when(userService.getLoggedUser()).thenReturn(mockUser);

        AssistanceRequestCeapgDTO ceapgDTO = new AssistanceRequestCeapgDTO();
        ceapgDTO.setCustoFinalCeapg(BigDecimal.valueOf(500));

        when(service.updateCeapgFields(eq(1L), any(AssistanceRequestCeapgDTO.class)))
                .thenThrow(new UnauthorizedException("Usuário não autorizado"));

        mvc.perform(MockMvcRequestBuilders.put("/assistancerequest/1/ceapg")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ceapgDTO)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.status", is("error")));
    }
}