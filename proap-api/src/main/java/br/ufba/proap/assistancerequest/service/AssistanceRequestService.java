package br.ufba.proap.assistancerequest.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;
import br.ufba.proap.assistancerequest.domain.dto.ResponseAssistanceRequestDTO;
import br.ufba.proap.assistancerequest.repository.AssistanceRequestQueryRepository;
import br.ufba.proap.assistancerequest.repository.AssistanteRequestRepository;
import br.ufba.proap.authentication.domain.User;

@Service
public class AssistanceRequestService {

	@Autowired
	private AssistanteRequestRepository assistanteRequestRepository;

	@Autowired
	private AssistanceRequestQueryRepository assistanceRequestQueryRepository;

	public List<ResponseAssistanceRequestDTO> findAll() {
		List<AssistanceRequest> assistanceRequest = assistanteRequestRepository.findAll();

		return assistanceRequest.stream().map((ar) -> {
			return ResponseAssistanceRequestDTO.fromEntity(ar);
		}).toList();
	}

	public List<AssistanceRequest> findByUser(User user) {
		return assistanteRequestRepository.findByUser(user);
	}

	public Optional<AssistanceRequest> findById(Long id) {
		return assistanteRequestRepository.findById(id);
	}

	public static class AssistanceRequestListFiltered {
		public List<ResponseAssistanceRequestDTO> list;
		public long total;

		public AssistanceRequestListFiltered(List<ResponseAssistanceRequestDTO> list,
				long total) {
			this.list = list;
			this.total = total;
		}

		public static AssistanceRequestListFiltered fromEntity(List<AssistanceRequest> list, long total) {
			return new AssistanceRequestListFiltered(
					list.stream().map((ar) -> {
						return ResponseAssistanceRequestDTO.fromEntity(ar);
					}).toList(),
					total);
		}

	}

	/**
	 * Busca os registros de assistência usando paginação e ordenação a partir de
	 * uma propriedade
	 * 
	 * @param sortBy          Atributo do objeto AssistanceRequest para ordenação
	 * @param ascending       Se falso, será por ordem descendente
	 * @param page            Número da página (primeira página como 0)
	 * @param requestListSize Tamanho da página/da lista
	 * @param user            Filtrar por usuário
	 * @return Lista de assistâncias que devem ser exibidas na página
	 */
	public AssistanceRequestListFiltered find(
			String sortBy,
			boolean ascending,
			int page,
			int requestListSize,
			User user) {
		long count;

		boolean userHasPermission = user.getPerfil() != null
				&& user.getPerfil().hasPermission("VIEW_ALL_REQUESTS");

		if (userHasPermission)
			count = assistanteRequestRepository.count();
		else
			count = assistanteRequestRepository.countByUser(user);

		return AssistanceRequestListFiltered.fromEntity(
				assistanceRequestQueryRepository.findFiltered(
						sortBy,
						ascending,
						page,
						requestListSize,
						userHasPermission ? null : user),
				count);
	}

	public AssistanceRequest save(AssistanceRequest assistanceReques) {
		return assistanteRequestRepository.save(assistanceReques);
	}

	public void delete(AssistanceRequest assistanceRequestDTO) {
		assistanteRequestRepository.delete(assistanceRequestDTO);
	}
}
