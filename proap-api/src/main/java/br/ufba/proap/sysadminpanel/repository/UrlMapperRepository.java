package br.ufba.proap.sysadminpanel.repository;

import org.springframework.stereotype.Repository;

import br.ufba.proap.sysadminpanel.domain.UrlMapper;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UrlMapperRepository extends JpaRepository<UrlMapper, Long> {
}
