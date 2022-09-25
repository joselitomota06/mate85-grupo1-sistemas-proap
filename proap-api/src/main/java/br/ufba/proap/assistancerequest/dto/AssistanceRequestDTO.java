package br.ufba.proap.assistancerequest.dto;

import java.util.Date;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class AssistanceRequestDTO {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String email;
	
	@Column(nullable = false)
	private String nomeDoSolicitante;
	
	@Column(nullable = false)
	private Boolean aceiteFinal;
	
	@Column(nullable = false)
	private Date dataInicio;
	
	@Column(nullable = false)
	private Date dataFim;
	
	@Column(nullable = false)
	private String linkHomepage;
	
	@Column(nullable = false)
	private String pais;
	
	@Column(nullable = false)
	private String cidade;
	
	@Column(nullable = false)
	private Float valorInscricao;
	
	@Column(nullable = false)
	private String cartaAceite;
	
	@Column(nullable = false)
	private Boolean solicitacaoApoio;
	
	@Column(nullable = false)
	private Float valorSolicitado;
	
	@Column(nullable = false)
	private String comprovantePagamento;
	
	@Column(nullable = false)
	private Boolean solicitacaoAuxilioOutrasFontes;
	
	@Column(nullable = false)
	private String nomeAgenciaFomento;
	
	@Column(nullable = false)
	private String valorSolicitadoAgenciaFormento;
	
	@Column(nullable = false)
	private String nomeCompleto;
	
	@Column(nullable = false)
	private String doi;
	
	@Column(nullable = false)
	private String autores;
	
	
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
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getNomeDoSolicitante() {
		return nomeDoSolicitante;
	}
	
	public void setNomeDoSolicitante(String nomeDoSolicitante) {
		this.nomeDoSolicitante = nomeDoSolicitante;
	}	
	
	public Boolean getAceiteFinal() {
		return aceiteFinal;
	}
	
	public void setAceiteFinal(Boolean aceiteFinal) {
		this.aceiteFinal = aceiteFinal;
	}

	public Date getDataInicio() {
		return dataInicio;
	}
	
	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}
	
	public Date getDataFim() {
		return dataFim;
	}
	
	public void setDataFim(Date dataFim) {
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
}
