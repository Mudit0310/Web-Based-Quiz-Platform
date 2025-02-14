package com.cdac.project.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "student_details")
public class StudentDetails {

    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentId;

    @Column(nullable = false, length = 50)
    private String studentName;

    @Column(nullable = false, length = 50)
    private String studentEmail;

    @Column(nullable = false, length = 50, unique = true)
    private String studentPassword;

    @Column(nullable = false, length = 10)
    private String studentPhoneNumber;
}