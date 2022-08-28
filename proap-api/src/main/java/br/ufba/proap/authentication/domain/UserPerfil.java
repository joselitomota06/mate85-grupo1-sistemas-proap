package br.ufba.proap.authentication.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity
@Table(name = "aut_user_perfil", schema = "proap")
public class UserPerfil implements Serializable {

	private static final long serialVersionUID = 6718249363254821367L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private boolean enable;
	private boolean admin;

	@ManyToOne
	private Perfil perfil;

	@ManyToOne
	private User user;

	@Version
	private int version;

	public UserPerfil() { }

	public UserPerfil(Long id, int version, boolean enable, boolean admin, Perfil perfil, User user) {
		this.id = id;
		this.version = version;
		this.enable = enable;
		this.admin = admin;
		this.perfil = perfil;
		this.user = user;
	}

	public UserPerfil(boolean enable, boolean admin, Perfil perfil, User user) {
		this.enable = enable;
		this.admin = admin;
		this.perfil = perfil;
		this.user = user;
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

	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
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