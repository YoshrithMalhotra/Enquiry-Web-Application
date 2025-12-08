package com.customerenquiry.dto;

import com.customerenquiry.model.Enquiry;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnquiryResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private LocalDateTime createdAt;
    
    public static EnquiryResponse fromEntity(Enquiry enquiry) {
        return new EnquiryResponse(
            enquiry.getId(),
            enquiry.getName(),
            enquiry.getEmail(),
            enquiry.getPhone(),
            enquiry.getMessage(),
            enquiry.getCreatedAt()
        );
    }
}
