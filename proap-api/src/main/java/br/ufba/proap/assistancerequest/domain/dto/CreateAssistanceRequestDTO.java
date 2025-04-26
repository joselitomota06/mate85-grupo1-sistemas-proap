package br.ufba.proap.assistancerequest.domain.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.ufba.proap.assistancerequest.domain.AssistanceRequest;

public record CreateAssistanceRequestDTO(
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
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate dataInicio,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy") LocalDate dataFim,
        Boolean afastamentoParaParticipacao,
        Integer diasAfastamento,
        String linkHomePageEvento,
        String cidade,
        String pais,
        String qualis,
        String modalidadeParticipacao,
        BigDecimal valorInscricao,
        String linkPaginaInscricao,
        Integer quantidadeDiariasSolicitadas,
        BigDecimal valorDiaria,
        Boolean ultimaDiariaIntegral,
        Boolean isDolar,
        BigDecimal cotacaoMoeda,
        BigDecimal valorPassagem,
        BigDecimal valorTotal,
        String justificativa) {

    public static CreateAssistanceRequestDTO fromEntity(AssistanceRequest entity) {
        return new CreateAssistanceRequestDTO(
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
                entity.getUltimaDiariaIntegral(),
                entity.getIsDolar(),
                entity.getCotacaoMoeda(),
                entity.getValorPassagem(),
                entity.getValorTotal(),
                entity.getJustificativa());
    }

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
        entity.setUltimaDiariaIntegral(this.ultimaDiariaIntegral());
        entity.setIsDolar(this.isDolar());
        entity.setCotacaoMoeda(this.cotacaoMoeda());
        entity.setValorPassagem(this.valorPassagem());
        entity.setValorTotal(this.valorTotal());
        entity.setJustificativa(this.justificativa());
        return entity;
    }
}
