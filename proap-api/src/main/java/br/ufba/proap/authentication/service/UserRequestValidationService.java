package br.ufba.proap.authentication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.repository.AssistanceRequestRepository;
import br.ufba.proap.assistancerequest.repository.ExtraRequestRepostirory;

@Service
public class UserRequestValidationService {

    @Autowired
    private AssistanceRequestRepository assistanceRequestRepository;

    @Autowired
    private ExtraRequestRepostirory extraRequestRepository;

    public Boolean userHasAnySolicitationRequests(Long userId) {
        return assistanceRequestRepository.userHasAnySolicitationRequests(userId);
    }

    public Boolean userHasAnyExtraRequests(Long userId) {
        return extraRequestRepository.userHasAnyExtraRequests(userId);
    }
}