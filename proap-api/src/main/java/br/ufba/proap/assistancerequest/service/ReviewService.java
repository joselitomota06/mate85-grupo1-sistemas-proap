package br.ufba.proap.assistancerequest.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.assistancerequest.domain.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.domain.Review;
import br.ufba.proap.assistancerequest.domain.dto.ReviewDTO;
import br.ufba.proap.assistancerequest.domain.enums.ReviewSituacao;
import br.ufba.proap.assistancerequest.repository.ReviewRepository;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    public Review save(Review review) {
        review.setSituacao(ReviewSituacao.EM_ANALISE);
        return reviewRepository.save(review);
    }

    public Review approve(ReviewDTO reviewDTO) {
        Review review = createReview(reviewDTO);

        review.setDataAprovacao(LocalDateTime.now());
        review.setSituacao(ReviewSituacao.APROVADO);

        return reviewRepository.save(review);
    }

    public Review reprove(ReviewDTO reviewDTO) {
        Review review = createReview(reviewDTO);

        review.setSituacao(ReviewSituacao.REPROVADO);

        return reviewRepository.save(review);
    }

    public Review createReview(ReviewDTO reviewDTO) {
        Review review = new Review();
        review.setNumeroAta(reviewDTO.numeroAta);
        review.setNumeroDiariasAprovadas(reviewDTO.numeroDiariasAprovadas);
        review.setObservacao(reviewDTO.observacao);

        return review;
    }

    public void delete(Review review) {
        reviewRepository.delete(review);
    }
}
