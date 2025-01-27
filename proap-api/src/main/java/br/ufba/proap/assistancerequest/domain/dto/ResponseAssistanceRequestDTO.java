package br.ufba.proap.assistancerequest.domain.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;
import br.ufba.proap.authentication.domain.dto.UserResponseDTO;

public record ResponseAssistanceRequestDTO(
        UserResponseDTO user,
        String tituloPublicacao,
        List<String> coautores,
        Boolean algumCoautorPGCOMP,
        Boolean solicitanteDocente,
        String nomeDocente,
        String nomeDiscente,
        Boolean discenteNoPrazoDoCurso,
        Integer mesesAtrasoCurso,
        String nomeEvento,
        Boolean eventoInternacional,
        LocalDate dataInicio,
        LocalDate dataFim,
        Boolean afastamentoParaParticipacao,
        Integer diasAfastamento,
        String linkHomePageEvento,
        String cidade,
        String pais,
        String qualis,
        String modalidadeParticipacao,
        Float valorInscricao,
        String linkPaginaInscricao,
        Integer quantidadeDiariasSolicitadas,
        Float valorDiaria,
        Boolean isDolar,
        Float cotacaoMoeda,
        Float valorPassagem,
        Float valorTotal,
        String cartaAceite,
        String justificativa,
        Boolean aceiteFinal,
        Integer situacao,
        String comprovantePagamento,
        String numeroAta,
        LocalDate dataAprovacao,
        Integer numeroDiariasAprovadas,
        Float valorAprovado,
        String observacao,
        String automaticDecText,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDateTime createdAt,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDateTime updatedAt) {

    public AssistanceRequest toEntity() {
        AssistanceRequest entity = new AssistanceRequest();
        entity.setTituloPublicacao(this.tituloPublicacao());
        entity.setCoautores(this.coautores());
        entity.setAlgumCoautorPGCOMP(this.algumCoautorPGCOMP());
        entity.setSolicitanteDocente(this.solicitanteDocente());
        entity.setNomeDocente(this.nomeDocente());
        entity.setNomeDiscente(this.nomeDiscente());
        entity.setDiscenteNoPrazoDoCurso(this.discenteNoPrazoDoCurso());
        entity.setMesesAtrasoCurso(this.mesesAtrasoCurso());
        entity.setNomeEvento(this.nomeEvento());
        entity.setEventoInternacional(this.eventoInternacional());
        entity.setDataInicio(this.dataInicio());
        entity.setDataFim(this.dataFim());
        entity.setAfastamentoParaParticipacao(this.afastamentoParaParticipacao());
        entity.setDiasAfastamento(this.diasAfastamento());
        entity.setLinkHomePageEvento(this.linkHomePageEvento());
        entity.setCidade(this.cidade());
        entity.setPais(this.pais());
        entity.setQualis(this.qualis());
        entity.setModalidadeParticipacao(this.modalidadeParticipacao());
        entity.setValorInscricao(this.valorInscricao());
        entity.setLinkPaginaInscricao(this.linkPaginaInscricao());
        entity.setQuantidadeDiariasSolicitadas(this.quantidadeDiariasSolicitadas());
        entity.setValorDiaria(this.valorDiaria());
        entity.setIsDolar(this.isDolar());
        entity.setCotacaoMoeda(this.cotacaoMoeda());
        entity.setValorPassagem(this.valorPassagem());
        entity.setValorTotal(this.valorTotal());
        entity.setCartaAceite(this.cartaAceite());
        entity.setJustificativa(this.justificativa());
        entity.setAceiteFinal(this.aceiteFinal());
        entity.setSituacao(this.situacao());
        entity.setComprovantePagamento(this.comprovantePagamento());
        entity.setNumeroAta(this.numeroAta());
        entity.setDataAprovacao(this.dataAprovacao());
        entity.setNumeroDiariasAprovadas(this.numeroDiariasAprovadas());
        entity.setValorAprovado(this.valorAprovado());
        entity.setObservacao(this.observacao());
        entity.setAutomaticDecText(this.automaticDecText());
        entity.setCreatedAt(this.createdAt());
        entity.setUpdatedAt(this.updatedAt());
        return entity;
    }

    public static ResponseAssistanceRequestDTO fromEntity(AssistanceRequest entity) {
        return new ResponseAssistanceRequestDTO(
                UserResponseDTO.fromUser(entity.getUser()),
                entity.getTituloPublicacao(),
                entity.getCoautores(),
                entity.getAlgumCoautorPGCOMP(),
                entity.getSolicitanteDocente(),
                entity.getNomeDocente(),
                entity.getNomeDiscente(),
                entity.getDiscenteNoPrazoDoCurso(),
                entity.getMesesAtrasoCurso(),
                entity.getNomeEvento(),
                entity.getEventoInternacional(),
                entity.getDataInicio(),
                entity.getDataFim(),
                entity.getAfastamentoParaParticipacao(),
                entity.getDiasAfastamento(),
                entity.getLinkHomePageEvento(),
                entity.getCidade(),
                entity.getPais(),
                entity.getQualis(),
                entity.getModalidadeParticipacao(),
                entity.getValorInscricao(),
                entity.getLinkPaginaInscricao(),
                entity.getQuantidadeDiariasSolicitadas(),
                entity.getValorDiaria(),
                entity.getIsDolar(),
                entity.getCotacaoMoeda(),
                entity.getValorPassagem(),
                entity.getValorTotal(),
                entity.getCartaAceite(),
                entity.getJustificativa(),
                entity.getAceiteFinal(),
                entity.getSituacao(),
                entity.getComprovantePagamento(),
                entity.getNumeroAta(),
                entity.getDataAprovacao(),
                entity.getNumeroDiariasAprovadas(),
                entity.getValorAprovado(),
                entity.getObservacao(),
                entity.getAutomaticDecText(),
                entity.getCreatedAt(),
                entity.getUpdatedAt());
    }
}
