package com.cdac.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cdac.project.model.TestMarks;
import com.cdac.project.repository.TestMarksRepository;

@Service
public class TestMarksService 
{

    @Autowired
    private TestMarksRepository testMarksRepository;

    public TestMarks saveTestMarks(TestMarks testMarks) 
    {
        return testMarksRepository.save(testMarks);
    }
}