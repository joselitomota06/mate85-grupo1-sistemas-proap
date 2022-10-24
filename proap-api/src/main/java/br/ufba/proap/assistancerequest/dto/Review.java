package br.ufba.proap.assistancerequest.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
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

    private Date dataAprovacao;

    @Column(nullable = false)
    private int numeroDiariasAprovadas;

    private String observacao;

    @Column(nullable = false)
    private int situacao;

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

    public Date getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(Date dataAprovacao) {
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
}
