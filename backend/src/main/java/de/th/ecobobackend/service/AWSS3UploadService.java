package de.th.ecobobackend.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.ObjectMetadata;
import de.th.ecobobackend.model.UserProfile;
import de.th.ecobobackend.mongoDB.UserProfileMongoDB;
import de.th.ecobobackend.utils.IDUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;

@Service
public class AWSS3UploadService {

    //entspricht der Enviromentvariablen AWS_ACCESSKEY
    @Value("${aws.accesskey}")
    private String aws_access_key;

    //entspricht der Enviromentvariablen AWS_SECRETKEY
    @Value("${aws.secretkey}")
    private String aws_secret_key;

    private final IDUtils idUtils;
    private final UserProfileMongoDB userProfileMongoDB;

    public AWSS3UploadService(IDUtils idUtils, UserProfileMongoDB userProfileMongoDB) {
        this.idUtils = idUtils;
        this.userProfileMongoDB = userProfileMongoDB;
    }

    public String uploadImgToAWSS3(MultipartFile multipartFile, Principal principal) throws IOException {
        Regions clientRegion = Regions.EU_CENTRAL_1;
        String bucketName = "ecobo-bucket";

        if (!multipartFile.getContentType().contains("image") || multipartFile.getContentType().isBlank()
                || multipartFile.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong file type.");
        }

        if (multipartFile.getSize() > 4000000){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Uploaded file is too large. Maximum filesize is 4 MB.");
        }

        Optional<String> fileExtension = Optional.ofNullable(multipartFile.getOriginalFilename())
                        .filter(name -> name.contains("."))
                        .map(name -> name.substring(multipartFile.getOriginalFilename().lastIndexOf(".") +1));

        String fileObjKeyName = "profilepics/img_profilepic_" + idUtils.generateID() + "." + fileExtension.get();

        try {
            AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                    .withRegion(clientRegion).withCredentials(new AWSStaticCredentialsProvider(
                            new BasicAWSCredentials(aws_access_key, aws_secret_key))).build();

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(multipartFile.getSize());
            s3Client.putObject(bucketName, fileObjKeyName, multipartFile.getInputStream(), objectMetadata);

            Optional<UserProfile> existingUser = userProfileMongoDB.findById(principal.getName());

            if (existingUser.isPresent()){

                UserProfile updatedUser = UserProfile.builder()
                        .username(existingUser.get().getUsername())
                        .password(existingUser.get().getPassword())
                        .registrationDateExternal(existingUser.get().getRegistrationDateExternal())
                        .registrationDateInternal(existingUser.get().getRegistrationDateInternal())
                        .profilePic("http://ecobo-bucket.s3-website.eu-central-1.amazonaws.com/" + fileObjKeyName.trim())
                        .build();

                userProfileMongoDB.save(updatedUser);
            }

            return "http://ecobo-bucket.s3-website.eu-central-1.amazonaws.com/" + fileObjKeyName.trim();
        } catch (AmazonS3Exception e){
            e.printStackTrace();
        } catch (SdkClientException e){
            e.printStackTrace();
        }

        return "";
    }
}
