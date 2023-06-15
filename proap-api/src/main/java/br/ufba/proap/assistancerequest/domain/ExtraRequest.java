package br.ufba.proap.assistancerequest.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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

	// Dados do solicitante
	@ManyToOne
	private User user;

	@Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'Sem título'")
	private String titulo;
	
	private Boolean isDiscente;
	
	private String itemSolicitado;

	@Column(columnDefinition = "text")
	private String justificativa;

	//06/11 - Apenas seguindo o que vem sendo utilizado no projeto, mas o recomenda seria utilizar BigDecimal.
	private Float valorSolicitado;

	private Boolean solicitacaoApoio;
	private Boolean solicitacaoAuxilioOutrasFontes;
	
	private String nomeSolicitacao;
	
	@Column(nullable = true)
	private String nomeAgenciaFomento;
	
	@Column(nullable = true)
	private String valorSolicitadoAgenciaFormento;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDateTime createdAt;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDateTime updatedAt;
	
	// 0 - Em revisao, 1 - Aceita, 2 - Nao Aceita
	@Column(nullable = false) 
	private int situacao;
		
	@Column(nullable = true)
	private String numeroAta;
		
	@Column(nullable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataAprovacao;
	
	
	@Column(nullable = true)
	private Float valorAprovado;
		    
	@Column(nullable = true)
	private String observacao;	
		    
	// Apos aceite
	@Column(nullable = true, columnDefinition = "text")
	private String automaticDecText;
	
	public String getItemSolicitado() {
		return itemSolicitado;
	}

	public void setItemSolicitado(String itemSolicitado) {
		this.itemSolicitado = itemSolicitado;
	}
	
	public Boolean getIsDiscente() {
		return isDiscente;
	}

	public void setIsDiscente(Boolean isDiscente) {
		this.isDiscente = isDiscente;
	}
	
	public String getNomeSolicitacao() {
		return nomeSolicitacao;
	}

	public void setNomeSolicitacao(String nomeSolicitacao) {
		this.nomeSolicitacao = nomeSolicitacao;
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

	public int getSituacao() {
		return situacao;
	}

	public void setSituacao(int situacao) {
		this.situacao = situacao;
	}

	public String getNumeroAta() {
		return numeroAta;
	}

	public void setNumeroAta(String numeroAta) {
		this.numeroAta = numeroAta;
	}

	public LocalDate getDataAprovacao() {
		return dataAprovacao;
	}

	public void setDataAprovacao(LocalDate dataAprovacao) {
		this.dataAprovacao = dataAprovacao;
	}

	public Float getValorAprovado() {
		return valorAprovado;
	}

	public void setValorAprovado(Float valorAprovado) {
		this.valorAprovado = valorAprovado;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public String getAutomaticDecText() {
		return automaticDecText;
	}

	public void setAutomaticDecText(String automaticDecText) {
		String name = this.user.getName();
		String valorSolicitado = this.valorSolicitado.toString();
		String item = this.itemSolicitado;
		String justificativa = this.justificativa;
		
		String tratamento = "discente";
		
		
		if(this.isDiscente == false) {	
			tratamento = "docente";
			
		} 
		
		if(this.situacao == 1) {
			this.automaticDecText = "O "+tratamento+" "+name+" solicita apoio para compra de "+item+" com valor de R$"+valorSolicitado+" com a justificativa, "+justificativa+
					"Após verificação da documentação enviada pelo discente, a comissão Proap entende que a solicitação está de acordo com a resolução PROAP vigente e recomenda sua aprovação.";
		
		}else {
			this.automaticDecText = "O "+tratamento+" "+name+" solicita apoio para compra de "+item+" com valor de R$"+valorSolicitado+" com a justificativa, "+justificativa+
					"Após verificação da documentação enviada pelo discente, a comissão Proap entende que a solicitação não está de acordo com a resolução PROAP vigente e recomenda sua reprovação.";
		
		}
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

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
}
