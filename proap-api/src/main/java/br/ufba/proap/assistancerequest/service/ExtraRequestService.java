package br.ufba.proap.assistancerequest.service;

import java.util.List;
import java.util.Optional;

import br.ufba.proap.assistancerequest.repository.ExtraRequestQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.domain.ExtraRequest;
import br.ufba.proap.assistancerequest.repository.ExtraRequestRepostirory;
import br.ufba.proap.authentication.domain.User;

import javax.validation.constraints.NotNull;

@Service
public class ExtraRequestService {

	@Autowired
	private ExtraRequestRepostirory extraRequestRepostirory;

	@Autowired
	private ExtraRequestQueryRepository extraRequestQueryRepository;

	public List<ExtraRequest> findAll() {
		return extraRequestRepostirory.findAll();
	}

	public List<ExtraRequest> findByUser(User user) {
		return extraRequestRepostirory.findByUser(user);
	}

	public Optional<ExtraRequest> findById(Long id) {
		return extraRequestRepostirory.findById(id);
	}

	public ExtraRequest save(ExtraRequest extraRequest) {
		return extraRequestRepostirory.save(extraRequest);
	}

	public void delete(ExtraRequest extraRequest) {
		extraRequestRepostirory.delete(extraRequest);	
	}

	public static class ExtraRequestListFiltered {
		public List<ExtraRequest> list;
		public long total;

		public ExtraRequestListFiltered(List<ExtraRequest> list, long total) {
			this.list = list;
			this.total = total;
		}
	}

	/**
	 * Busca os registros de demanda extra usando paginação e ordenação a partir de uma propriedade
	 * @param prop Atributo do objeto ExtraRequest para ordenação
	 * @param ascending Se falso, será por ordem descendente
	 * @param page Número da página (primeira página como 0)
	 * @param size Tamanho da página/da lista
	 * @param user Filtrar por usuário
	 * @return Lista de demandas extras que devem ser exibidas na página
	 */
	public ExtraRequestListFiltered find(
			String prop,
			boolean ascending,
			int page,
			int size,
			@NotNull User user) {
		long count = 0;

		boolean userIsAdmin = user.getPerfil() != null
				&& user.getPerfil().isAdmin();

		if(userIsAdmin)
			count = extraRequestRepostirory.count();
		else count = extraRequestRepostirory.countByUser(user);

		return new ExtraRequestListFiltered(
				extraRequestQueryRepository.findFiltered(
						prop,
						ascending,
						page,
						size,
						userIsAdmin ? null : user
				),
				count
		);
	}
}
