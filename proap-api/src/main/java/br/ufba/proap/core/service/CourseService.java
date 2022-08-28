package br.ufba.proap.core.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufba.proap.core.domain.Course;
import br.ufba.proap.core.repository.CourseRepository;

@Service
public class CourseService {

	@Autowired
	private CourseRepository repository;

	public Course create(Course course) {
		return repository.saveAndFlush(course);
	}

	public Course update(Course course) {
		return repository.save(course);
	}

	public List<Course> findAll() {
		return repository.findAll();
	}

	public Optional<Course> findById(Long id) {
		return repository.findById(id);
	}

	public void remove(Course course) {
		repository.delete(course);
	}

}
