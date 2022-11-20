package br.ufba.proap.assistancerequest.domain;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufba.proap.authentication.domain.User;

@Entity
@Table(name = "proap_extra_request", schema = "proap")
public class ExtraRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private User user;

	private String nomeSolicitante;
	private String emailSolicitacao;

	@Column(columnDefinition = "text")
	private String justificativa;

	//06/11 - Apenas seguindo o que vem sendo utilizado no projeto, mas o recomenda seria utilizar BigDecimal.
	private Float valorSolicitado;

	private Boolean solicitacaoApoio;
	private Boolean solicitacaoAuxilioOutrasFontes;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDateTime createdAt;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDateTime updatedAt;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Boolean getSolicitacaoApoio() {
		return solicitacaoApoio;
	}

	public void setSolicitacaoApoio(Boolean solicitacaoApoio) {
		this.solicitacaoApoio = solicitacaoApoio;
	}

	public Float getValorSolicitado() {
		return valorSolicitado;
	}

	public void setValorSolicitado(Float valorSolicitado) {
		this.valorSolicitado = valorSolicitado;
	}

	public Boolean getSolicitacaoAuxilioOutrasFontes() {
		return solicitacaoAuxilioOutrasFontes;
	}

	public void setSolicitacaoAuxilioOutrasFontes(Boolean solicitacaoAuxilioOutrasFontes) {
		this.solicitacaoAuxilioOutrasFontes = solicitacaoAuxilioOutrasFontes;
	}

	public String getNomeSolicitante() {
		return nomeSolicitante;
	}

	public void setNomeSolicitante(String nomeSolicitante) {
		this.nomeSolicitante = nomeSolicitante;
	}

	public String getEmailSolicitacao() {
		return emailSolicitacao;
	}

	public void setEmailSolicitacao(String emailSolicitacao) {
		this.emailSolicitacao = emailSolicitacao;
	}

	public String getJustificativa() {
		return justificativa;
	}

	public void setJustificativa(String justificativa) {
		this.justificativa = justificativa;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	@PrePersist
	public void prePersist() {
		setCreatedAt(LocalDateTime.now());
	}

	@PreUpdate
	public void preUpdate() {
		setUpdatedAt(LocalDateTime.now());
	}
}
