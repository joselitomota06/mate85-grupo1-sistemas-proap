package br.ufba.proap.assistancerequest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.domain.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.repository.AssistanceRequestQueryRepository;
import br.ufba.proap.assistancerequest.repository.AssistanteRequestRepository;
import br.ufba.proap.authentication.domain.User;

@Service
public class AssistanceRequestService{

	@Autowired
	private AssistanteRequestRepository assistanteRequestRepository;

	@Autowired
	private AssistanceRequestQueryRepository assistanceRequestQueryRepository;

	public List<AssistanceRequestDTO> findAll() {
		return assistanteRequestRepository.findAll();
	}

	public List<AssistanceRequestDTO> findByUser(User user) {
		return assistanteRequestRepository.findByUser(user);
	}
	
	public Optional<AssistanceRequestDTO> findById(Long id) {
		return assistanteRequestRepository.findById(id);
	}

	public static class AssistanceRequestListFiltered {
		public List<AssistanceRequestDTO> list;
		public long total;

		public AssistanceRequestListFiltered(List<AssistanceRequestDTO> list,
				long total) {
			this.list = list;
			this.total = total;
		}
	}

	/**
	 * Busca os registros de assistência usando paginação e ordenação a partir de uma propriedade
	 * @param prop Atributo do objeto AssistanceRequest para ordenação
	 * @param ascending Se falso, será por ordem descendente
	 * @param page Número da página (primeira página como 0)
	 * @param requestListSize Tamanho da página/da lista
	 * @param user Filtrar por usuário
	 * @return Lista de assistâncias que devem ser exibidas na página
	 */
	public AssistanceRequestListFiltered find(
			String prop,
			boolean ascending,
			int page,
			int requestListSize,
			User user) {
		long count;

		boolean userIsAdmin = user.getPerfil() != null
				&& user.getPerfil().isAdmin();

		if(userIsAdmin)
			count = assistanteRequestRepository.count();
		else count = assistanteRequestRepository.countByUser(user);

		return new AssistanceRequestListFiltered(
				assistanceRequestQueryRepository.findFiltered(
						prop,
						ascending,
						page,
						requestListSize,
						userIsAdmin ? null : user
				),
				count);
	}

	public AssistanceRequestDTO save(AssistanceRequestDTO assistanceReques) {
		return assistanteRequestRepository.save(assistanceReques);
	}

	public void delete(AssistanceRequestDTO assistanceRequestDTO) {
		assistanteRequestRepository.delete(assistanceRequestDTO);	
	}
}
