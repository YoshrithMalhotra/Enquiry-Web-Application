package com.customerenquiry.service;

import com.customerenquiry.dto.EnquiryRequest;
import com.customerenquiry.dto.EnquiryResponse;
import com.customerenquiry.model.Enquiry;
import com.customerenquiry.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class EnquiryService {
    
    private final EnquiryRepository enquiryRepository;
    
    @Transactional
    public EnquiryResponse createEnquiry(EnquiryRequest request) {
        Enquiry enquiry = new Enquiry();
        enquiry.setName(request.getName());
        enquiry.setEmail(request.getEmail());
        enquiry.setPhone(request.getPhone());
        enquiry.setMessage(request.getMessage());
        
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        return EnquiryResponse.fromEntity(savedEnquiry);
    }
    
    @Transactional(readOnly = true)
    public Page<EnquiryResponse> getAllEnquiries(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return enquiryRepository.findAll(pageable)
                .map(EnquiryResponse::fromEntity);
    }
    
    @Transactional(readOnly = true)
    public Page<EnquiryResponse> searchEnquiries(String searchTerm, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        return enquiryRepository.searchByNameOrEmail(searchTerm, pageable)
                .map(EnquiryResponse::fromEntity);
    }
    
    @Transactional(readOnly = true)
    public EnquiryResponse getEnquiryById(Long id) {
        Enquiry enquiry = enquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found with id: " + id));
        return EnquiryResponse.fromEntity(enquiry);
    }
    
    @Transactional
    public void deleteEnquiry(Long id) {
        if (!enquiryRepository.existsById(id)) {
            throw new RuntimeException("Enquiry not found with id: " + id);
        }
        enquiryRepository.deleteById(id);
    }
}
