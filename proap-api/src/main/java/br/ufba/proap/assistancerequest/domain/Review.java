package br.ufba.proap.assistancerequest.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "proap_review", schema = "proap")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String numeroAta;

    private LocalDateTime dataAprovacao;

    @Column(nullable = false)
    private int numeroDiariasAprovadas;

    private String observacao;

    @Column(nullable = false)
    private int situacao;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime updatedAt;

    @JsonIgnore
    @OneToOne(mappedBy = "review")
    private AssistanceRequestDTO assistanceRequestDTO;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AssistanceRequestDTO getAssistanceRequestDTO() {
        return assistanceRequestDTO;
    }

    public void setAssistanceRequestDTO(AssistanceRequestDTO assistanceRequestDTO) {
        this.assistanceRequestDTO = assistanceRequestDTO;
    }

    public String getNumeroAta() {
        return numeroAta;
    }

    public void setNumeroAta(String numeroAta) {
        this.numeroAta = numeroAta;
    }

    public LocalDateTime getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(LocalDateTime dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public int getNumeroDiariasAprovadas() {
        return numeroDiariasAprovadas;
    }

    public void setNumeroDiariasAprovadas(int numeroDiariasAprovadas) {
        this.numeroDiariasAprovadas = numeroDiariasAprovadas;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public int getSituacao() {
        return situacao;
    }

    public void setSituacao(int situacao) {
        this.situacao = situacao;
    }

    @PrePersist
    public void prePersist() {
        setCreatedAt(LocalDateTime.now());
    }

    @PreUpdate
    public void preUpdate() {
        setUpdatedAt(LocalDateTime.now());
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
