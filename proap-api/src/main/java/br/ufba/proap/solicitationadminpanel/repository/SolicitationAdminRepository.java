package br.ufba.proap.solicitationadminpanel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.ufba.proap.solicitationadminpanel.domain.SolicitationAdmin;

import java.util.List;

@Repository
public interface SolicitationAdminRepository extends JpaRepository<SolicitationAdmin, Long> {
    List<SolicitationAdmin> findByYear(Integer year);
}