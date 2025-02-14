package com.cdac.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cdac.project.model.TestMarks;

@Repository
public interface TestMarksRepository extends JpaRepository<TestMarks, Integer> {
}