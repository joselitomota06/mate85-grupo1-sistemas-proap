package br.ufba.proap.solicitationadminpanel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.ufba.proap.solicitationadminpanel.domain.SolicitationAdmin;

import java.util.List;
import java.util.Optional;

@Repository
public interface SolicitationAdminRepository extends JpaRepository<SolicitationAdmin, Long> {
    Optional<SolicitationAdmin> findByYear(Integer year);

    @Query("SELECT s.year FROM SolicitationAdmin s ORDER BY s.year")
    List<Integer> findAllAvailableYears();
}