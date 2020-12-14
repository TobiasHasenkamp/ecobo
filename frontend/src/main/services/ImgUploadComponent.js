import React, {useContext, useEffect, useState} from "react";
import LoginContext from "../contexts/createContexts/LoginContext";
import axios from "axios";
import styled from "styled-components/macro";
import EcoElementContext from "../contexts/createContexts/EcoElementContext";

export default function ImgUploadComponent({type, dark, ecoElementId}){

    const [imgFile, setImgFile] = useState();
    const [buttonHasBeenClicked, setButtonHasBeenClicked] = useState(false);
    const {token} = useContext(LoginContext);
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
                <EditPictureButtonDark onClick={handleClickOnUploadImageButton}>Edit Picture</EditPictureButtonDark>
            : <EditPictureButton onClick={handleClickOnUploadImageButton}>Edit Picture</EditPictureButton>}
            <input type="file" id="invisibleFileButton" onChange={handlePictureChange} style={{display: "none"}}/>
        </>
    );

}

const EditPictureButton = styled.div`
  color: white;
  padding-top: 7px;
  font-size: 0.7em;
  text-align: center;
`

const EditPictureButtonDark = styled.div`
  color: var(--neutral-color-darkgrey);
  padding-top: 7px;
  font-size: 0.7em;
  text-align: center;
`