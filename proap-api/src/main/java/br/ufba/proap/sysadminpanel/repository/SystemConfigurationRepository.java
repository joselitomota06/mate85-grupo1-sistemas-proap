package br.ufba.proap.sysadminpanel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufba.proap.sysadminpanel.domain.SystemConfiguration;

@Repository
public interface SystemConfigurationRepository extends JpaRepository<SystemConfiguration, Long> {

}