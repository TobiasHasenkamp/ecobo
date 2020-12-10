package de.th.ecobobackend.controller;

import de.th.ecobobackend.service.AWSS3UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@RequestMapping("api/elements/protected/uploadImg")
public class ImgUploadController {

    private final AWSS3UploadService awss3UploadService;

    @Autowired
    public ImgUploadController(AWSS3UploadService awss3UploadService) {
        this.awss3UploadService = awss3UploadService;
    }

    @PostMapping
    public String receiveUploadedImg(@RequestParam("file") MultipartFile multipartFile, Principal principal) throws IOException {
        return awss3UploadService.uploadImgToAWSS3(multipartFile, principal);
    }
}
