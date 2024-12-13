package br.ufba.proap.authentication.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "aut_perfil", schema = "proap")
public class Perfil implements Serializable {

	private static final long serialVersionUID = 6718249363254821367L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true)
	private String name;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "aut_perfil_permission", schema = "proap", joinColumns = @JoinColumn(name = "perfil_id"), inverseJoinColumns = @JoinColumn(name = "permission_id"))
	private Set<Permission> permissions;

	@JsonManagedReference
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "perfil")
	private List<User> users;

	public boolean hasPermission(String key) {
		return permissions.stream().filter(Permission::isEnabled).anyMatch(p -> p.getKey().equalsIgnoreCase(key));
	}
}