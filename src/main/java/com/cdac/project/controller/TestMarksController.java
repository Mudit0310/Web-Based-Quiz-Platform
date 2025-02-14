package com.cdac.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.cdac.project.model.TestMarks;
import com.cdac.project.service.TestMarksService;

@RestController
@RequestMapping("/api/testmarks")
public class TestMarksController {

    @Autowired
    private TestMarksService testMarksService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitTestMarks(@RequestBody TestMarks testMarks) {
        try {
            // Step 1: Save the test marks using TestMarksService
            testMarksService.saveTestMarks(testMarks);
            return ResponseEntity.ok("Test marks saved successfully.");
        } catch (ResponseStatusException e) {
            // Return error message if duplicate is found
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error saving test marks");
        }
    }
}