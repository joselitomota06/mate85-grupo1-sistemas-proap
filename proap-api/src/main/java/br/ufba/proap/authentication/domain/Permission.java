package br.ufba.proap.authentication.domain;

import java.io.Serializable;

import javax.persistence.*;

@Entity
@Table(name = "aut_permission", schema = "proap")
public class Permission implements Serializable {

	private static final long serialVersionUID = -2112649075203340365L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean enable;
    private boolean shortcut;
    private boolean readOnly;

    @ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "perfil_id")
    private Perfil perfil;
    
    @Version
    private int version;

    public Permission() { }

	public Permission(Long id, int version, boolean enable, boolean shortcut, boolean readOnly,
			Perfil perfil) {
		this.id = id;
		this.version = version;
		this.enable = enable;
		this.shortcut = shortcut;
		this.readOnly = readOnly;
		this.perfil = perfil;
	}

	public Permission(boolean enable, boolean shortcut, boolean readOnly, Perfil perfil) {
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
		return "Permission [enable=" + enable + ", perfil=" + perfil + "]";
	}

}