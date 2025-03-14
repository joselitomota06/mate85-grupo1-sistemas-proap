package br.ufba.proap.assistancerequest.repository;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;
import br.ufba.proap.authentication.domain.User;

@Repository
public class AssistanceRequestQueryRepository {
    @PersistenceContext
    private EntityManager em;

    public List<AssistanceRequest> findFiltered(String sortBy, boolean ascending, int page, int limitPerPage,
            User user) {
        StringBuilder query = new StringBuilder("from AssistanceRequest ar");

        if (user != null)
            query.append(" where ar.user.id = :userId");

        query.append(" order by ar.");
        query.append(sortBy);
        query.append(ascending ? " asc" : " desc");

        TypedQuery<AssistanceRequest> typedQuery = em.createQuery(query.toString(), AssistanceRequest.class);

        if (user != null)
            typedQuery.setParameter("userId", user.getId());

        return typedQuery.setFirstResult(limitPerPage * page).setMaxResults(limitPerPage).getResultList();
    }
}
