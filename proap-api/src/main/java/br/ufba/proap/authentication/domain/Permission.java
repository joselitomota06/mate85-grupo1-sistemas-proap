package br.ufba.proap.authentication.domain;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@Table(name = "aut_permission", schema = "proap")
public class Permission implements Serializable {

	private static final long serialVersionUID = -2112649075203340365L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String component;
    private boolean enable;
    private boolean shortcut;
    private boolean readOnly;

    @ManyToOne
    private Perfil perfil;
    
    @Version
    private int version;

    public Permission() { }

	public Permission(Long id, int version, String component, boolean enable, boolean shortcut, boolean readOnly,
			Perfil perfil) {
		this.id = id;
		this.version = version;
		this.component = component;
		this.enable = enable;
		this.shortcut = shortcut;
		this.readOnly = readOnly;
		this.perfil = perfil;
	}

	public Permission(String component, boolean enable, boolean shortcut, boolean readOnly, Perfil perfil) {
		this.component = component;
		this.enable = enable;
		this.shortcut = shortcut;
		this.readOnly = readOnly;
		this.perfil = perfil;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getComponent() {
		return component;
	}

	public void setComponent(String component) {
		this.component = component;
	}

	public boolean isEnable() {
		return enable;
	}

	public void setEnable(boolean enable) {
		this.enable = enable;
	}

	public boolean isShortcut() {
		return shortcut;
	}

	public void setShortcut(boolean shortcut) {
		this.shortcut = shortcut;
	}

	public boolean isReadOnly() {
		return readOnly;
	}

	public void setReadOnly(boolean readyOnly) {
		this.readOnly = readyOnly;
	}

	@JsonIgnore
	@JsonProperty(access = Access.WRITE_ONLY)
	public Perfil getPerfil() {
		return perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Permission [component=" + component + ", enable=" + enable + ", perfil=" + perfil + "]";
	}

}