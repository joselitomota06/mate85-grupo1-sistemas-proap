package br.ufba.proap.core.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ufba.proap.core.domain.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {}
