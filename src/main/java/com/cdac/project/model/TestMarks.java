package com.cdac.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "test_marks")
public class TestMarks {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // Auto-generated primary key

    private int studentId;
    private int testId;
    private int marksObtained;

    public TestMarks() {}

    public TestMarks(int studentId, int testId, int marksObtained) {
        this.studentId = studentId;
        this.testId = testId;
        this.marksObtained = marksObtained;
    }

    public int getId() {
        return id;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getTestId() {
        return testId;
    }

    public void setTestId(int testId) {
        this.testId = testId;
    }

    public int getMarksObtained() {
        return marksObtained;
    }

    public void setMarksObtained(int marksObtained) {
        this.marksObtained = marksObtained;
    }
}