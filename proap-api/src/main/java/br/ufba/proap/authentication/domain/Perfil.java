package br.ufba.proap.authentication.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Version;

import br.ufba.proap.authentication.domain.enums.EnumPerfilType;

@Entity
@Table(name = "aut_perfil", schema = "proap")
public class Perfil implements Serializable {

	private static final long serialVersionUID = 2845975304143585010L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    @Enumerated(EnumType.STRING)
    private EnumPerfilType type;

    @OneToMany(targetEntity = Permission.class, mappedBy = "perfil", cascade = {CascadeType.REMOVE})
    private List<Permission> permissions;

    @Version
    private int version;

	public Perfil() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String descricao) {
		this.description = descricao;
	}

	public EnumPerfilType getType() {
		return type;
	}

	public void setTipo(EnumPerfilType type) {
		this.type = type;
	}

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void serPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	@Override
	public String toString() {
		return "Perfil [name=" + name + ", description=" + description + "]";
	}
}