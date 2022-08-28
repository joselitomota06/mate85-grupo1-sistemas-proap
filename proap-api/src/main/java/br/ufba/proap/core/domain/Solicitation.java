package br.ufba.proap.core.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import br.ufba.proap.authentication.domain.User;
import br.ufba.proap.subscription.domain.enums.SolicitaionStatus;

@Entity
@Table(name = "proap_solicitation", schema = "proap")
public class Solicitation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private BigDecimal dailyValue;
	private Integer numberDays;	

	@Column(nullable = false)
	private String confirmationLink;

	@Enumerated(EnumType.STRING)
	private SolicitaionStatus status;

	@ManyToOne
	private User user;

	@Version
	private int version;
	
	public Solicitation() {}

	public BigDecimal getDailyValue() {
		return dailyValue;
	}

	public void setDailyValue(BigDecimal dailyValue) {
		this.dailyValue = dailyValue;
	}

	public Integer getNumberDays() {
		return numberDays;
	}

	public void setNumberDays(Integer numberDays) {
		this.numberDays = numberDays;
	}

	public String getConfirmationLink() {
		return confirmationLink;
	}

	public void setConfirmationLink(String confirmedLink) {
		this.confirmationLink = confirmedLink;
	}

	public SolicitaionStatus getStatus() {
		return status;
	}

	public void setStatus(SolicitaionStatus status) {
		this.status = status;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}
}