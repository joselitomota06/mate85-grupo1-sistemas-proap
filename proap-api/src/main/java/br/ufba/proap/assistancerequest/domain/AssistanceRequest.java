package br.ufba.proap.assistancerequest.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufba.proap.authentication.domain.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "proap_assistancerequest", schema = "proap")
public class AssistanceRequest {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// Dados da Solicitação
	@ManyToOne
	private User user;

	@Column(nullable = false)
	private String tituloPublicacao;

	private String coautores;

	@Column(nullable = false)
	private Boolean algumCoautorPGCOMP;

	// Detalhes do Solicitante
	@Column(nullable = false)
	private Boolean solicitanteDocente;

	@Column(nullable = false)
	private String nomeDocente;

	private String nomeDiscente;

	@Column(nullable = true)
	private Boolean discenteNoPrazoDoCurso;

	@Column(nullable = true, name = "meses_atraso")
	private Integer mesesAtrasoCurso;

	// Detalhamento do Evento (ou Solicitação)

	@Column(nullable = false)
	private String nomeEvento;

	@Column(nullable = false)
	private Boolean eventoInternacional;

	@Column(nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataInicio;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
	private LocalDate dataFim;

	@Column(nullable = false)
	private Boolean afastamentoParaParticipacao;

	private Integer diasAfastamento;

	private String linkHomePageEvento;

	@Column(nullable = false)
	private String cidade;

	@Column(nullable = false)
	private String pais;

	private String qualis;

	@Column(nullable = false)
	private String modalidadeParticipacao;

	// Detalhamento Financeiro

	private Float valorInscricao;

	private String linkPaginaInscricao;

	private Integer quantidadeDiariasSolicitadas;

	private Float valorDiaria;

	private Boolean isDolar;

	private Float cotacaoMoeda;

	private Float valorPassagem;

	// Aceite e Justificativa

	@Column(nullable = true, columnDefinition = "BYTEA")
	private byte[] cartaAceite;

	private String justificativa;

	private Boolean aceiteFinal;

	// Dados sobre a revisão

	// 0 - Em revisao, 1 - Aceita, 2 - Nao Aceita
	@Column(nullable = false)
	private Integer situacao;

	@Column(nullable = true)
	private String comprovantePagamento;

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
	private Float valorTotal;

	@Column(nullable = true)
	private String observacao;

	// Apos aceite
	@Column(nullable = true, columnDefinition = "text", length = 100000)
	private String automaticDecText;

	public List<String> getCoautores() {
		return coautores != null ? List.of(coautores.split(",")) : List.of();
	}

	public void setCoautores(List<String> coautores) {
		this.coautores = coautores != null ? String.join(",", coautores) : null;
	}

	public void setAutomaticDecText(String automaticDecText) {
		String name = this.user.getName();
		String valorSolicitado = this.valorInscricao.toString();
		String quantDiarias = String.valueOf(this.quantidadeDiariasSolicitadas);
		// String calculoDiarias = String.valueOf(this.valorSolicitado /
		// this.quantidadeDiariasSolicitadas);
		String nomeTrabalho = this.tituloPublicacao;
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
						+ this.cotacaoMoeda + " para apresentação de trabalho oral (" + nomeTrabalho + ") no evento "
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
							+ this.cotacaoMoeda + " para apresentação de trabalho oral (" + nomeTrabalho
							+ ") no evento "
							+ evento + ", Qualis " + qualis + ", a ser realizado em " + cidade + "-" + pais
							+ ", no período de " + inicio + " a " + fim
							+ ". Após verificação da documentação enviada, a comissão Proap entende que a solicitação não está de acordo com a resolução vigente e recomenda sua reprovação.";
				}
			}
		}
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
		AssistanceRequest other = (AssistanceRequest) obj;
		return Objects.equals(id, other.id);
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
