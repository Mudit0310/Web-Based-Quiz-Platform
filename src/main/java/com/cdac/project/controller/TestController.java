package com.cdac.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cdac.project.service.TestDetailsService;
import com.cdac.project.service.TestRetrievalService;
import com.cdac.project.service.TestService;
import com.cdac.project.dto.CsvResponse;
import com.cdac.project.model.Question;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tests")
public class TestController {

    private final TestService testService;
    private final TestRetrievalService testRetrievalService;
    @Autowired
    private TestDetailsService testDetailsService;

    public TestController(TestService testService, TestRetrievalService testRetrievalService) {
        this.testService = testService;
        this.testRetrievalService = testRetrievalService;
    }

    @PostMapping("/upload")
    public ResponseEntity<CsvResponse> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("testId") int testId,
            @RequestParam("testName") String testName,
            @RequestParam("duration") int duration,
            @RequestParam("totalMarks") int totalMarks) {
        try {
            // Step 1: Check if a test with the given name already exists
            boolean testNameExists = testDetailsService.isTestNameExists(testName);

            if (testNameExists) {
                // Step 2: Delete the old test data
                testDetailsService.deleteTest(testName);

                // Optionally, return a message to the frontend indicating that the old test was replaced
                CsvResponse response = new CsvResponse("Test with name '" + testName + "' already exists. Replacing with new file.", 0, 0, 0, null);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            }

            // Step 3: Save the course details
            testDetailsService.saveTestDetails(testId, testName, duration, totalMarks);

            // Step 4: Process the CSV file using TestService
            CsvResponse response = testService.processCSV(file);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.internalServerError().body(new CsvResponse("Error processing file: " + e.getMessage(), 0, 0, 0, null));
        }
    }


    @GetMapping("/{topic}")
    public List<Question> getQuestionsByTopic(@PathVariable String topic) {
        return testRetrievalService.retrieveQuestions(topic);
    }
}
