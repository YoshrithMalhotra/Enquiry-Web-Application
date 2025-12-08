package com.customerenquiry.controller;

import com.customerenquiry.dto.ApiResponse;
import com.customerenquiry.dto.EnquiryRequest;
import com.customerenquiry.dto.EnquiryResponse;
import com.customerenquiry.service.EnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class EnquiryController {
    
    private final EnquiryService enquiryService;
    
    @PostMapping
    public ResponseEntity<ApiResponse<EnquiryResponse>> createEnquiry(
            @Valid @RequestBody EnquiryRequest request) {
        try {
            EnquiryResponse response = enquiryService.createEnquiry(request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(ApiResponse.success("Enquiry submitted successfully", response));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit enquiry: " + e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<Page<EnquiryResponse>>> getAllEnquiries(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false) String search) {
        try {
            Page<EnquiryResponse> enquiries;
            if (search != null && !search.trim().isEmpty()) {
                enquiries = enquiryService.searchEnquiries(search, page, size, sortBy);
            } else {
                enquiries = enquiryService.getAllEnquiries(page, size, sortBy);
            }
            return ResponseEntity.ok(ApiResponse.success("Enquiries retrieved successfully", enquiries));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve enquiries: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EnquiryResponse>> getEnquiryById(@PathVariable Long id) {
        try {
            EnquiryResponse response = enquiryService.getEnquiryById(id);
            return ResponseEntity.ok(ApiResponse.success("Enquiry retrieved successfully", response));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to retrieve enquiry: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEnquiry(@PathVariable Long id) {
        try {
            enquiryService.deleteEnquiry(id);
            return ResponseEntity.ok(ApiResponse.success("Enquiry deleted successfully", null));
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to delete enquiry: " + e.getMessage()));
        }
    }
}
