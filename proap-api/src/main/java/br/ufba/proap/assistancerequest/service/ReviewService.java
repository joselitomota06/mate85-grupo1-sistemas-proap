package br.ufba.proap.assistancerequest.service;

import br.ufba.proap.assistancerequest.dto.AssistanceRequestDTO;
import br.ufba.proap.assistancerequest.dto.Review;
import br.ufba.proap.assistancerequest.repository.ReviewServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        // TODO Auto-generated method stub
        return reviewServiceRepository.save(review);
    }

    public void delete(Review review) {
        reviewServiceRepository.delete(review);
    }
}
