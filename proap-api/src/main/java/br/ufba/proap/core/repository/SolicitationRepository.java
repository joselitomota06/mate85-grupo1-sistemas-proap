package br.ufba.proap.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufba.proap.core.domain.Solicitation;

public interface SolicitationRepository extends JpaRepository<Solicitation, Long> {}
