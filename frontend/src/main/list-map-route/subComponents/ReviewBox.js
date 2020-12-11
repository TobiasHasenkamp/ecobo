import {StyledCell, StyledElementBody, StyledHeaderRow, StyledWrapperTable} from "../StyledElementsForTableDesign";
import {FaCheck, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp, FaTimes} from "react-icons/fa";
import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components/macro";
import {addReviewToEcoElement} from "../../services/ecoElementService";
import EcoElementContext from "../../contexts/createContexts/EcoElementContext";
import LoginContext from "../../contexts/createContexts/LoginContext";

export default function ReviewBox(){

    const {ecoElement, setEcoElement} = useContext(EcoElementContext);
    const {token, username} = useContext(LoginContext);
    const [commentSectionIsOpen, setCommentSectionIsOpen] = useState(false);
    const [addReviewSectionIsOpen, setAddReviewSectionIsOpen] = useState(false);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewTableIsOpen, setReviewTableIsOpen] = useState(true);


    useEffect(() => {
        setCommentSectionIsOpen(false);
        setAddReviewSectionIsOpen(false);
        setReviewTableIsOpen(true);
    }, [])

    function handleShowAddReviewSection(){
        setAddReviewSectionIsOpen(!addReviewSectionIsOpen);
    }

    function handleShowCommentsSection(){
        if (ecoElement.reviews.filter((review) => (review.reviewComment !== "")).length > 0){
            setCommentSectionIsOpen(!commentSectionIsOpen);
        }
    }

    function handleShowReviewSection(){
        setReviewTableIsOpen(!reviewTableIsOpen);
    }

    function returnWordForCommentaries(){
        if (ecoElement.reviews.filter((review) => (review.reviewComment !== "")).length === 1){
            return " Kommentar ";
        }
        else{
            return " Kommentare ";
        }
    }

    function handleAddReview(event){
        //function seems to have problems, cause not every time the event is transported, maybe this is only a problem in the browser?
        if (event.target.getAttribute("name") === "positiveAddReviewButton"){
            addReviewToEcoElement(ecoElement.id, true, reviewComment, token, setEcoElement);
            setAddReviewSectionIsOpen(false);
        }
        else if (event.target.getAttribute("name") === "negativeAddReviewButton"){
            addReviewToEcoElement(ecoElement.id, false, reviewComment, token, setEcoElement);
            setAddReviewSectionIsOpen(false);
        }
    }

    function handleAddReviewCommentChange(event){
        setReviewComment(event.target.value);
    }

    function returnPercentageOfPositiveReviews(element) {

        if (element.reviews.length > 0 && element.reviews.length !== undefined) {
            const positivePercentage = Math.round(100 / element.reviews.length * element.reviews.filter(
                (review) => (review.positive)).length);

            if (positivePercentage === undefined || positivePercentage === Infinity || positivePercentage < 0){
                return " (0% positiv)";
            }

            return " (" + positivePercentage + "% positiv)";
        }
        else {
            return "-";
        }
    }

    function returnHeadlineForAddingAReview(element){

        if (element.reviews.filter((review) => (review.author === username)).length !== 0){
            return "Dein bestehendes Review überschreiben "
        }
        else {
            return "Eigenes Review hinzufügen ";
        }
    }

    return (

        ecoElement.isReviewed === false &&
            <StyledWrapperTable>
                <StyledHeaderRow className="lightgrey">
                    {"Review "}
                    {reviewTableIsOpen ? <FaRegArrowAltCircleUp style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowReviewSection}/>
                    : <FaRegArrowAltCircleDown style={{fontSize: "0.9em", marginBottom: "-1px"}} onClick={handleShowReviewSection}/>}
                </StyledHeaderRow>

                {/*review message if item was reset*/}
                {(reviewTableIsOpen && ecoElement.adminNote === "Review has been resetted because of an element edit." &&
                    ecoElement.reviews.length < 2) &&
                    <StyledElementBody>
                        <StyledCell style={{ gridColumn: "1 / span 2" }}>
                            Dieses Element wurde am {ecoElement.dateLastUpdatedExternal} substantiell geändert. Deshalb wurde der Review-Prozess neugestartet.
                        </StyledCell>
                    </StyledElementBody>}

                {/*Review status*/}
                {reviewTableIsOpen &&
                    <StyledElementBody>
                        <StyledCell style={{gridColumn: "1 / span 2"}}>
                            <StyledDivForCheckMarkersForEveryReview> {"Status: "}
                                {ecoElement.reviews !== undefined && ecoElement.reviews.length > 0 &&
                                ecoElement.reviews.map((review) => (
                                    review.positive ? <FaCheck key={review.author} className="positive"/>
                                        : <FaTimes key={review.author} className="negative"/>)
                                )}

                                {returnPercentageOfPositiveReviews(ecoElement)}

                            </StyledDivForCheckMarkersForEveryReview>
                        </StyledCell>
                    </StyledElementBody>
                }

                {/*review system description*/}
                {reviewTableIsOpen &&
                    <StyledElementBody>
                        <StyledCell style={{gridColumn: "1 / span 2"}}>
                            Für eine Bestätigung werden mindestens 3 positive und insgesamt 75% positive Reviews benötigt.
                        </StyledCell>
                    </StyledElementBody>
                }

                {/*Show comments*/}
                {reviewTableIsOpen &&
                    <StyledElementBody>
                        <StyledCell style={{gridColumn: "1 / span 2"}}>
                            {ecoElement.reviews.filter((review) => (review.reviewComment !== "")).length}
                            {returnWordForCommentaries()}
                            {commentSectionIsOpen ? <FaRegArrowAltCircleUp onClick={handleShowCommentsSection}/>
                                : <FaRegArrowAltCircleDown onClick={handleShowCommentsSection}/>}
                        </StyledCell>
                        {commentSectionIsOpen &&
                        <StyledCell style={{gridColumn: "1 / span 2"}}>
                            <StyledListForComments>
                                {ecoElement.reviews.filter((review) => (review.reviewComment !== ""))
                                    .map((review) => (<li key={review.author}>"{review.reviewComment}"
                                        ({review.author}, {review.dateReviewedExternal})</li>))}
                            </StyledListForComments>
                        </StyledCell>
                        }
                    </StyledElementBody>
                }


                {/*Add your own review*/}
                {reviewTableIsOpen &&
                    <StyledElementBody>
                        <StyledCell style={{gridColumn: "1 / span 2"}}>
                            {returnHeadlineForAddingAReview(ecoElement)} {addReviewSectionIsOpen ?
                            <FaRegArrowAltCircleUp onClick={handleShowAddReviewSection}/>
                            : <FaRegArrowAltCircleDown onClick={handleShowAddReviewSection}/>}
                        </StyledCell>
                        {addReviewSectionIsOpen &&
                        <StyledCell style={{gridColumn: "1 / span 2"}}>

                            <label style={{verticalAlign: "top"}} htmlFor="reviewComment">Comment (optional):</label> {" "}
                            <StyledTextboxForComments rows={3} maxLength={200} name="reviewComment" value={reviewComment}
                                                      onChange={handleAddReviewCommentChange} type="text"/>
                            <StyledDivForAddingANewReview>Ihre Bewertung:
                                <FaCheck name="positiveAddReviewButton" className="positive" onClick={handleAddReview}/>
                                <FaTimes name="negativeAddReviewButton" className="negative" onClick={handleAddReview}/>
                            </StyledDivForAddingANewReview>

                        </StyledCell>
                        }
                        <StyledCell>
                        </StyledCell>
                    </StyledElementBody>
                }

            </StyledWrapperTable>

    )
}




const StyledDivForCheckMarkersForEveryReview = styled.div`
  
  .negative{
    color: red;
    margin: -2px 2px;
  }
  
  .positive{
    color: green;
    margin: -2px 2px;
  }
`

const StyledListForComments = styled.ul`
      font-size: 2.9vmin;
      list-style: square;
      padding: 0 24px;
      margin: -7px 0 0 0;
`

const StyledDivForAddingANewReview = styled.div`
      padding: 6px 0;
      margin: 0;
      font-size: 1.15em;
      
    .negative{
        color: red;
        margin: -2px 5px;
    }
  
    .positive{
      color: green;
      margin: -2px 5px;
    }
`

const StyledTextboxForComments = styled.textarea`
    width: 95%;
    margin-top: 5px;
`