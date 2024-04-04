import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";
import {
  useGetImageWordQuery,
  useGetGameQuery,
} from "./gameSlice";

import "./game.css";

/**
 *
 * @function calculateScore
 * @param {Integer} currentQuestion
 * @returns the users score on the game, the amount of quiz questions it takes the user to solve the image word subtracted from the amount of quiz questions.
 */
const calculateScore = (currentquestion) => {
  const yourScore = 11 - currentquestion;
  return yourScore + "/10";
};

/**
 *
 * @component GameScoreCorrect returns the final view of the game if the users answer is correct. The user can view the unblurred image, the correct answer word and their final score for the game.
 */
export default function GameScoreCorrect() {
  const { id } = useParams();
  const { data: quiz } = useGetGameQuery(id);
  const { data: imageandword } = useGetImageWordQuery(quiz?.image_Word_id);
  // do we need this? const [updateUser] = useUpdatedUserMutation();

  return (
    <>
      <section id="imageContainer">
        <img id="image" src={imageandword?.image_url} />
      </section>
      <article id="answerInformation">
        <div id="correctAnswer">
          <h1>Correct! : {imageandword?.topic_word}</h1>
        </div>
        <div>
          <p id="quizScore">
            FINAL QUIZ SCORE: {calculateScore(quiz?.current_question)}
          </p>
        </div>
      </article>
      <button id="buttonGame">
        <Link id="link" to="/account/:id">
          HOME
        </Link>
      </button>
    </>
  );
}
