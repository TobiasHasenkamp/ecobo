package de.th.ecobobackend.controller;

import de.th.ecobobackend.service.AWSS3UploadService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("api/elements/protected/uploadImg")
public class ImgUploadController {

    private final AWSS3UploadService awss3UploadService;

    @Autowired
    public ImgUploadController(AWSS3UploadService awss3UploadService) {
        this.awss3UploadService = awss3UploadService;
    }

    @PostMapping
    public String receiveUploadedImgForUser(@RequestParam("file") MultipartFile multipartFile, Principal principal) throws IOException {
        return awss3UploadService.uploadUserImgToAWSS3(multipartFile, principal);
    }

    @PostMapping("/{ecoElementId}")
    public String receiveUploadedImgForEcoElement(@RequestParam("file") MultipartFile multipartFile,
                                                  @PathVariable @NonNull Optional<String> ecoElementId,
                                                  Principal principal) throws IOException {
        return awss3UploadService.uploadEcoElementImgToAWSS3(multipartFile, ecoElementId, principal);
    }
}
