package br.ufba.proap.assistancerequest.repository;

import br.ufba.proap.assistancerequest.domain.ExtraRequest;
import br.ufba.proap.authentication.domain.User;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.List;

@Repository
public class ExtraRequestQueryRepository {
    @PersistenceContext
    private EntityManager em;

    public List<ExtraRequest> findFiltered(
            String prop,
            boolean ascending,
            int page,
            int size,
            User user) {
        StringBuilder query = new StringBuilder("from ExtraRequest ar");

        if (user != null)
            query.append(" where ar.user.id = :userId");

        query.append(" order by ar.");
        query.append(prop);
        query.append(ascending ? " asc" : " desc");

        TypedQuery<ExtraRequest> typedQuery = em.createQuery(query.toString(), ExtraRequest.class);

        if (user != null)
            typedQuery.setParameter("userId", user.getId());

        return typedQuery.setFirstResult(size * page).setMaxResults(size).getResultList();
    }
}
