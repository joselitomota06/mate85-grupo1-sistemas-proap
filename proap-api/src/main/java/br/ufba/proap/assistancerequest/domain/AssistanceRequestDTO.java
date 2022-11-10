package br.ufba.proap.assistancerequest.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

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
@Table(name = "proap_assistancerequest", schema = "proap")
public class AssistanceRequestDTO {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private User user;

	private String nomeSolicitante;

	private String emailSolicitacao;

	private Boolean aceiteFinal;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataInicio;

	@Column(nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataFim;

	private String linkHomepage;

	@Column(nullable = false)
	private String pais;

	@Column(nullable = false)
	private String cidade;

	private Float valorInscricao;

	private String cartaAceite;

	private Boolean solicitacaoApoio;

	@Column(nullable = true)
	private Float valorSolicitado;

	@Column(nullable = true)
	private String comprovantePagamento;

	@Column(nullable = true)
	private Boolean solicitacaoAuxilioOutrasFontes;

	@Column(nullable = true)
	private String nomeAgenciaFomento;

	@Column(nullable = true)
	private String valorSolicitadoAgenciaFormento;

	private String nomeCompleto;

	private String doi;

	private String autores;
	
	private Boolean autoresPresentePGCOMP;
	
	@Column(nullable = true)
	private Float coinVariation;
	
	private Boolean isDolar;

	public Boolean getAutoresPresentePGCOMP() {
		return autoresPresentePGCOMP;
	}

	public void setAutoresPresentePGCOMP(Boolean autoresPresentePGCOMP) {
		this.autoresPresentePGCOMP = autoresPresentePGCOMP;
	}

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "reviewId", referencedColumnName = "id")
	private Review review;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDateTime createdAt;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDateTime updatedAt;

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AssistanceRequestDTO other = (AssistanceRequestDTO) obj;
		return Objects.equals(id, other.id);
	}

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

	public Boolean getAceiteFinal() {
		return aceiteFinal;
	}

	public void setAceiteFinal(Boolean aceiteFinal) {
		this.aceiteFinal = aceiteFinal;
	}

	public LocalDate getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(LocalDate dataInicio) {
		this.dataInicio = dataInicio;
	}

	public LocalDate getDataFim() {
		return dataFim;
	}

	public void setDataFim(LocalDate dataFim) {
		this.dataFim = dataFim;
	}

	public String getLinkHomepage() {
		return linkHomepage;
	}

	public void setLinkHomepage(String linkHomepage) {
		this.linkHomepage = linkHomepage;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public Float getValorInscricao() {
		return valorInscricao;
	}

	public void setValorInscricao(Float valorInscricao) {
		this.valorInscricao = valorInscricao;
	}

	public String getCartaAceite() {
		return cartaAceite;
	}

	public void setCartaAceite(String cartaAceite) {
		this.cartaAceite = cartaAceite;
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

	public String getComprovantePagamento() {
		return comprovantePagamento;
	}

	public void setComprovantePagamento(String comprovantePagamento) {
		this.comprovantePagamento = comprovantePagamento;
	}

	public Boolean getSolicitacaoAuxilioOutrasFontes() {
		return solicitacaoAuxilioOutrasFontes;
	}

	public void setSolicitacaoAuxilioOutrasFontes(Boolean solicitacaoAuxilioOutrasFontes) {
		this.solicitacaoAuxilioOutrasFontes = solicitacaoAuxilioOutrasFontes;
	}

	public String getNomeAgenciaFomento() {
		return nomeAgenciaFomento;
	}

	public void setNomeAgenciaFomento(String nomeAgenciaFomento) {
		this.nomeAgenciaFomento = nomeAgenciaFomento;
	}

	public String getValorSolicitadoAgenciaFormento() {
		return valorSolicitadoAgenciaFormento;
	}

	public void setValorSolicitadoAgenciaFormento(String valorSolicitadoAgenciaFormento) {
		this.valorSolicitadoAgenciaFormento = valorSolicitadoAgenciaFormento;
	}

	public String getNomeCompleto() {
		return nomeCompleto;
	}

	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}

	public String getDoi() {
		return doi;
	}

	public void setDoi(String doi) {
		this.doi = doi;
	}

	public String getAutores() {
		return autores;
	}

	public void setAutores(String autores) {
		this.autores = autores;
	}

	public Review getReview() {
		return review;
	}

	public void setReview(Review review) {
		this.review = review;
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
