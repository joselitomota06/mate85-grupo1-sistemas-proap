package br.ufba.proap.assistancerequest.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufba.proap.authentication.domain.User;

@Entity
@Table(name = "proap_assistancerequest", schema = "proap")
public class AssistanceRequestDTO {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Dados do solicitante
	@ManyToOne
	private User user;

	// Dados da publicação
	private String nomeCompleto;

	private String doi;

	private String autores;

	private Boolean autoresPresentePGCOMP;

	// Dados de financiamento
	private Boolean solicitacaoApoio;

	@Column(nullable = true)
	private Float valorSolicitado;

	@Column(nullable = true)
	private Boolean solicitacaoAuxilioOutrasFontes;

	@Column(nullable = true)
	private String nomeAgenciaFomento;

	@Column(nullable = true)
	private String valorSolicitadoAgenciaFormento;

	// Dados do evento
	private String nomeEvento;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataInicio;

	@Column(nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataFim;

	private String linkHomepage;

	@Column(nullable = false)
	private String cidade;

	@Column(nullable = false)
	private String pais;

	private Float valorInscricao;

	private Integer quantidadeDiariasSolicitadas;

	private String cartaAceite;

	private String qualis;

	private Boolean isDolar;

	@Column(nullable = true)
	private Float coinVariation;

	@Column(nullable = true)
	private String comprovantePagamento;

	// Finalizacao da solicitacao
	private Boolean aceiteFinal;

	// Dados sobre a revisão

	// 0 - Em revisao, 1 - Aceita, 2 - Nao Aceita
	@Column(nullable = false)
	private Integer situacao;

	@Column(nullable = true)
	private String numeroAta;

	@Column(nullable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataAprovacao;

	@Column(nullable = true)
	private Integer numeroDiariasAprovadas;

	@Column(nullable = true)
	private Float valorAprovado;

	@Column(nullable = true)
	private String observacao;

	// Apos aceite
	@Column(nullable = true, columnDefinition = "text", length = 100000)
	private String automaticDecText;

	public String getNomeEvento() {
		return nomeEvento;
	}

	public void setNomeEvento(String nomeEvento) {
		this.nomeEvento = nomeEvento;
	}

	public Integer getQuantidadeDiariasSolicitadas() {
		return quantidadeDiariasSolicitadas;
	}

	public void setQuantidadeDiariasSolicitadas(Integer quantidadeDiariasSolicitadas) {
		this.quantidadeDiariasSolicitadas = quantidadeDiariasSolicitadas;
	}

	public String getQualis() {
		return qualis;
	}

	public void setQualis(String qualis) {
		this.qualis = qualis;
	}

	public Float getValorAprovado() {
		return valorAprovado;
	}

	public void setValorAprovado(Float valorAprovado) {
		this.valorAprovado = valorAprovado;
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

	public Integer getNumeroDiariasAprovadas() {
		return numeroDiariasAprovadas;
	}

	public void setNumeroDiariasAprovadas(Integer numeroDiariasAprovadas) {
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

	public void setSituacao(Integer situacao) {
		this.situacao = situacao;
	}

	public Float getCoinVariation() {
		return coinVariation;
	}

	public void setCoinVariation(Float coinVariation) {
		this.coinVariation = coinVariation;
	}

	public Boolean getIsDolar() {
		return isDolar;
	}

	public void setIsDolar(Boolean isDolar) {
		this.isDolar = isDolar;
	}

	public String getAutomaticDecText() {
		return automaticDecText;
	}

	public void setAutomaticDecText(String automaticDecText) {
		String name = this.user.getName();
		String valorSolicitado = this.valorInscricao.toString();
		String quantDiarias = String.valueOf(this.quantidadeDiariasSolicitadas);
		// String calculoDiarias = String.valueOf(this.valorSolicitado /
		// this.quantidadeDiariasSolicitadas);
		String nomeTrabalho = this.nomeCompleto;
		String evento = this.nomeEvento;
		String qualis = this.qualis;
		String cidade = this.cidade;
		String pais = this.pais;
		String inicio = this.dataInicio.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
		String fim = this.dataFim.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

		if (this.situacao == 1) {
			if (this.isDolar == false) {
				this.automaticDecText = "O discente " + name + " solicita apoio de inscrição (R$" + valorSolicitado
						+ " e " + quantDiarias + " diárias ) para apresentação de trabalho oral (" + nomeTrabalho
						+ ") no evento "
						+ evento + ", Qualis " + qualis + ", a ser realizado em " + cidade + "-" + pais
						+ ", no período de " + inicio + " a " + fim
						+ ". Após verificação da documentação enviada, a comissão Proap entende que a solicitação está de acordo com a resolução vigente e recomenda sua aprovação.";
			} else {
				this.automaticDecText = "O discente " + name + " solicita apoio de inscrição em dolar ($"
						+ valorSolicitado + " e " + quantDiarias
						+ " diárias ) com variação cambial atual informada de (R$ "
						+ this.coinVariation + " para apresentação de trabalho oral (" + nomeTrabalho + ") no evento "
						+ evento + ", Qualis " + qualis + ", a ser realizado em " + cidade + "-" + pais
						+ ", no período de " + inicio + " a " + fim
						+ ". Após verificação da documentação enviada, a comissão Proap entende que a solicitação está de acordo com a resolução vigente e recomenda sua aprovação.";
			}
		} else {
			if (this.situacao == 2) {
				if (this.isDolar == false) {
					this.automaticDecText = "O discente " + name + " solicita apoio de inscrição (R$" + valorSolicitado
							+ " e " + quantDiarias + " diárias) para apresentação de trabalho oral (" + nomeTrabalho
							+ ") no evento "
							+ evento + ", Qualis " + qualis + ", a ser realizado em " + cidade + "-" + pais
							+ ", no período de " + inicio + " a " + fim
							+ ". Após verificação da documentação enviada, a comissão Proap entende que a solicitação não está de acordo com a resolução vigente e recomenda sua reprovação.";
				} else {
					this.automaticDecText = "O discente " + name + " solicita apoio de inscrição em dolar ($"
							+ valorSolicitado + " e " + quantDiarias
							+ " diárias) com variação cambial atual informada de (R$ "
							+ this.coinVariation + " para apresentação de trabalho oral (" + nomeTrabalho
							+ ") no evento "
							+ evento + ", Qualis " + qualis + ", a ser realizado em " + cidade + "-" + pais
							+ ", no período de " + inicio + " a " + fim
							+ ". Após verificação da documentação enviada, a comissão Proap entende que a solicitação não está de acordo com a resolução vigente e recomenda sua reprovação.";
				}
			}
		}
	}

	public Boolean getAutoresPresentePGCOMP() {
		return autoresPresentePGCOMP;
	}

	public void setAutoresPresentePGCOMP(Boolean autoresPresentePGCOMP) {
		this.autoresPresentePGCOMP = autoresPresentePGCOMP;
	}

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
