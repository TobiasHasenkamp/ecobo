import React, {useContext, useEffect, useState} from "react";
import LoginContext from "../contexts/createContexts/LoginContext";
import axios from "axios";
import styled from "styled-components/macro";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";

export default function ImgUpload({type, dark, ecoElementId}){

    const {token} = useContext(LoginContext);
    const [imgFile, setImgFile] = useState();
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    const {setUserData} = useContext(LoginContext);
    const {setEcoElement} = useContext(EcoElementContext);

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

        if (type === "userImmediate"){
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
        else if (type === "elementImmediate"){
            axios
                .post("/api/elements/protected/uploadImg/" + ecoElementId, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    },
                })
                .then((response) => response.data)
                .then((data) => setNewEcoElementPicture(data));

            setButtonHasBeenClicked(false);
            setImgFile(null);
        }
    }

    function setNewProfilePicture(url){
        setUserData((prevState) => ({...prevState, profilePic: url}));
    }

    function setNewEcoElementPicture(url){
        setEcoElement((prevState) => ({...prevState, pictureUrl: url}));
    }

    useEffect(() => {
        if ((type === "userImmediate" || type === "elementImmediate") && imgFile && buttonHasBeenClicked){
            handlePictureUpload();
        }
        //react wants to add buttonHasBeenClicked as additional dependency, but this may produce errors like
        //starting this function without the imgFile being already updated as intended. It also would fired once
        //buttonHasBeenClicked gets emptied after a successful request.
        // eslint-disable-next-line
    }, [imgFile])


    return (
        <>
            {dark?
                <StyledEditPictureButtonDark onClick={handleClickOnUploadImageButton}>Edit Picture</StyledEditPictureButtonDark>
            : <StyledEditPictureButton onClick={handleClickOnUploadImageButton}>Edit Picture</StyledEditPictureButton>}
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

const StyledEditPictureButtonDark = styled.div`
  color: var(--darkgrey);
  padding-top: 7px;
  font-size: 0.7em;
  text-align: center;
`