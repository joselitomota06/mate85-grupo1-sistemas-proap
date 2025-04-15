package br.ufba.proap.assistancerequest.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;
import br.ufba.proap.authentication.domain.User;

@Repository
public interface AssistanceRequestRepository extends JpaRepository<AssistanceRequest, Long> {
	List<AssistanceRequest> findByUser(User user);

	long countByUser(User user);

	@Query("SELECT ar.id, ar.valorAprovado, ar.createdAt, ar.dataAvaliacaoProap, ap.name FROM AssistanceRequest ar LEFT JOIN ar.avaliadorProap ap WHERE DATE(ar.createdAt) BETWEEN :startDate AND :endDate AND ar.situacao = 1 ")
	List<Object[]> findTotalApprovedValueByDateRange(LocalDate startDate, LocalDate endDate);

	@Query("SELECT SUM(ar.valorAprovado) FROM AssistanceRequest ar WHERE YEAR(ar.createdAt) = :year AND ar.situacao = 1")
	Float findTotalApprovedValueByYear(Integer year);

	@Query("SELECT ar.id, ar.valorAprovado, ar.dataAvaliacaoProap, ap.name, ar.custoFinalCeapg, ar.observacoesCeapg, ac.name FROM AssistanceRequest ar LEFT JOIN ar.avaliadorProap ap LEFT JOIN ar.avaliadorCeapg ac WHERE DATE(ar.dataAvaliacaoProap) BETWEEN :startDate AND :endDate AND ar.situacao = 1")
	List<Object[]> findAllCeapgRequests(LocalDate startDate, LocalDate endDate);

	@Query("SELECT ar.id, ar.valorAprovado, ar.dataAvaliacaoProap, ap.name, ar.custoFinalCeapg, ar.observacoesCeapg, ac.name FROM AssistanceRequest ar LEFT JOIN ar.avaliadorProap ap LEFT JOIN ar.avaliadorCeapg ac WHERE DATE (ar.dataAvaliacaoProap) BETWEEN :startDate AND :endDate AND ar.situacao = 1 AND ar.avaliadorCeapg IS NULL")
	List<Object[]> findAllPendingCeapgRequests(LocalDate startDate, LocalDate endDate);

	@Query("SELECT ar.id, ar.valorAprovado, ar.dataAvaliacaoProap, ap.name, ar.custoFinalCeapg, ar.observacoesCeapg, ac.name FROM AssistanceRequest ar LEFT JOIN ar.avaliadorProap ap LEFT JOIN ar.avaliadorCeapg ac WHERE DATE (ar.dataAvaliacaoProap) BETWEEN :startDate AND :endDate AND ar.situacao = 1 AND ar.avaliadorCeapg IS NOT NULL")
	List<Object[]> findAllCompletedCeapgRequests(LocalDate startDate, LocalDate endDate);
}
