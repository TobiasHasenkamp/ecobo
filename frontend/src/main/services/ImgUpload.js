import React, {useContext, useEffect, useState} from "react";
import LoginTokenContext from "../contexts/LoginTokenContext";
import axios from "axios";
import styled from "styled-components/macro";

export default function ImgUpload({type}){

    const {token} = useContext(LoginTokenContext);
    const [imgFile, setImgFile] = useState();
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    const {setUserData} = useContext(LoginTokenContext);

    function handlePictureChange(event) {
        setButtonHasBeenClicked(true);
        setImgFile(event.target.files[0]);
    }

    function handlePictureUpload() {
        const formData = new FormData();
        formData.append('file', imgFile);
        ImageUploadRequest(formData, token);
    }

    function handleClickOnUploadImageButton(){
        document.getElementById('invisibleFileButton').click()
    }

    function ImageUploadRequest(formData, token){

        axios
            .post("/api/elements/protected/uploadImg", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                },
            })
            .then((response) => response.data)
            .then((data) => setNewProfilePicture(data));

        setButtonHasBeenClicked(false);
        setImgFile(null);

    }

    function setNewProfilePicture(url){
        setUserData({ profilePic: url});
    }

    useEffect(() => {
        if (type === "immediate" && imgFile && buttonHasBeenClicked){
            handlePictureUpload();
        }
        //react wants to add buttonHasBeenClicked as additional dependency, but this may produce errors like
        //starting this function without the imgFile being already updated as intended. It also would fired once
        //buttonHasBeenClicked gets emptied after a successful request.
        // eslint-disable-next-line
    }, [imgFile])


    return (
        <>
            <StyledEditPictureButton onClick={handleClickOnUploadImageButton}>Edit Picture</StyledEditPictureButton>
            <input type="file" id="invisibleFileButton" onChange={handlePictureChange} style={{display: "none"}}/>
        </>
    );

}

const StyledEditPictureButton = styled.div`
  color: white;
  padding-top: 7px;
  font-size: 0.7em;
  text-align: center;
`