import React, {useContext, useEffect, useState} from "react";
import LoginTokenContext from "../contexts/LoginTokenContext";
import axios from "axios";

export default function ImgUpload({type}){

    const {token} = useContext(LoginTokenContext);
    const [imgFile, setImgFile] = useState();
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);

    function handlePictureChange(event) {
        setButtonHasBeenClicked(true);
        setImgFile(event.target.files[0]);
    }

    function handlePictureUpload() {
        const formData = new FormData();
        formData.append('file', imgFile);
        //setProfileImageUrl(URL.createObjectURL(imageFile));

        ImageUploadRequest(formData, token);
    }

    function ImageUploadRequest(formData, token){

        axios
            .post("/api/elements/protected/uploadImg", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            })
            //.then((response) => response.data);
            .then(response => console.log(response));

        setButtonHasBeenClicked(false);
        setImgFile(null);
    }

    useEffect(() => {
        if (type === "immediate" && imgFile && buttonHasBeenClicked){
            handlePictureUpload();
        }
    }, [imgFile])



    return (

        <input type="file" name="img_upload" onChange={handlePictureChange}/>

    );

}