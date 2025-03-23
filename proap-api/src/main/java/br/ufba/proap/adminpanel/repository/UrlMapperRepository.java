package br.ufba.proap.adminpanel.repository;

import org.springframework.stereotype.Repository;

import br.ufba.proap.adminpanel.domain.UrlMapper;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UrlMapperRepository extends JpaRepository<UrlMapper, Long> {
}
