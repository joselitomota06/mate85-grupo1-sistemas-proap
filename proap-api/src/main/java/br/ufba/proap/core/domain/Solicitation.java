package br.ufba.proap.core.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Table;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonFormat;

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

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime createdAt;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime updatedAt;

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
    public void preUdate() {
    	setUpdatedAt(LocalDateTime.now());
    }

}