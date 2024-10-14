package br.ufba.proap.authentication.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "aut_perfil", schema = "proap")
public class Perfil implements Serializable {

	private static final long serialVersionUID = 6718249363254821367L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'Sem nome'")
	private String name;

	private boolean enable;
	private boolean admin;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "perfil")
	private List<Permission> permissions;

	@JsonManagedReference
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "perfil")
	private List<User> users;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime createdAt;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy HH:mm:ss")
	private LocalDateTime updatedAt;

	public Perfil() {
	}

	public Perfil(Long id, boolean enable, boolean admin, List<Permission> permissions, User user, String name) {
		this.id = id;
		this.enable = enable;
		this.admin = admin;
		this.permissions = permissions;
		this.name = name;
	}

	public Perfil(boolean enable, boolean admin, List<Permission> permissions, User user, String name) {
		this.enable = enable;
		this.admin = admin;
		this.permissions = permissions;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public List<Permission> getPermissons() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}