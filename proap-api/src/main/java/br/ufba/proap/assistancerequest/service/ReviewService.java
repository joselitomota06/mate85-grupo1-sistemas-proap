package br.ufba.proap.assistancerequest.service;

import br.ufba.proap.assistancerequest.dto.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.dto.Review;
import br.ufba.proap.assistancerequest.dto.dto.ReviewDTO;
import br.ufba.proap.assistancerequest.dto.enums.ReviewSituacao;
import br.ufba.proap.assistancerequest.repository.ReviewServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewServiceRepository reviewServiceRepository;

    public List<Review> getReviewServices(AssistanceRequestDTO assistanceRequestDTO) {
        return reviewServiceRepository.findByAssistanceRequestDTO(assistanceRequestDTO);

    }

    public void setReviewServiceRepository(ReviewServiceRepository reviewServiceRepository) {
        this.reviewServiceRepository = reviewServiceRepository;
    }

    public List<Review> findAll() {
        // TODO Auto-generated method stub
        return reviewServiceRepository.findAll();
    }

    public Optional<Review> findById(Long id) {
        // TODO Auto-generated method stub
        return reviewServiceRepository.findById(id);
    }

    public Review save(Review review) {
        review.setSituacao(ReviewSituacao.EM_ANALISE);
        return reviewServiceRepository.save(review);
    }

    public Review approve(ReviewDTO reviewDTO) {
        Review review = createReview(reviewDTO);

        review.setDataAprovacao(new Date());
        review.setSituacao(ReviewSituacao.APROVADO);

        return reviewServiceRepository.save(review);
    }

    public Review reprove(ReviewDTO reviewDTO) {
        Review review = createReview(reviewDTO);

        review.setSituacao(ReviewSituacao.REPROVADO);

        return reviewServiceRepository.save(review);
    }

    public Review createReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setNumeroAta(reviewDTO.numeroAta);
        review.setNumeroDiariasAprovadas(reviewDTO.numeroDiariasAprovadas);
        review.setObservacao(reviewDTO.observacao);

        return review;
    }

    public void delete(Review review) {
        reviewServiceRepository.delete(review);
    }
}
