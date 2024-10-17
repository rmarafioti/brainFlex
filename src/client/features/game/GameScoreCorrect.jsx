import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from "react";
import { useGetMeQuery } from "../account/accountSlice";
import { useGetImageWordQuery, useGetGameQuery } from "./gameSlice";

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

const isThereAQuiz = () => {
  const { data: me } = useGetMeQuery();
  let foundQuizToday = false;
  //isfoundquizcompleted is if it finds a quiz for that user today, is that quiz completed or not
  let todaysQuiz = null;
  //this function looks at all of a users quizzes, then for each of them takes the datetime of that quiz
  // and converts it to month date year format, then compares it to todays date in the same format
  // it then for each of the quizes if it finds a quiz, sets foundquiz today to true, and then after that sees if that quiz is completed.
  // there should never be more than one quiz for a user on a day, so shouldnt run into overlap
  for (let i = 0; i < me?.quizzes.length; i++) {
    const thedate = new Date(me?.quizzes[i].date_time).toString();
    const datechanged = thedate.split(" ").slice(1, 4).join(" ");
    if (datechanged === Date().split(" ").slice(1, 4).join(" ")) {
      foundQuizToday = true;
      todaysQuiz = me?.quizzes[i].id;
    }
  }

  return todaysQuiz;
};

/**
 *
 * @component GameScoreCorrect returns the final view of the game if the users answer is correct. The user can view the unblurred image, the correct answer word and their final score for the game.
 */
export default function GameScoreCorrect() {
  const todaysQuiz = isThereAQuiz();
  const id = todaysQuiz;
  const { data: quiz } = useGetGameQuery(id);
  const { data: imageandword } = useGetImageWordQuery(quiz?.image_Word_id);

  return (
    <article className="scoreIncorrect">
      <section id="imageContainer">
        <img
          id="image"
          src={imageandword?.image_url}
          alt="the revealed image of the answer word"
        />
      </section>
      <article id="answerInformation">
        <div>
          <h1 id="correctAnswer">Correct!:</h1>
          <h2 className="correctAnswerWord">{imageandword?.topic_word}</h2>
        </div>
        <div>
          <p id="quizScore">
            FINAL QUIZ SCORE: {calculateScore(quiz?.current_question)}
          </p>
        </div>
      </article>
      <Link id="buttonGame" className="link" to="/account/">
        HOME
      </Link>
    </article>
  );
}
