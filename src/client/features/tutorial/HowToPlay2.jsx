import { Link } from "react-router-dom";

import "./howToPlay.css";

/**
 *
 * @component HowToPlay2 returns a tutorial page on ow to play the quiz game.
 */
export default function HowToPlay2() {
  return (
    <>
      <section className="howToPlaySection">
        <h1 className="howToPlayHeader">🚀 Step 2: </h1>
        <h2 className="howToPlayTagline">The Quest for Clues!</h2>
        <p className="howToPlayInstructions">
          Tackle 10 intriguing questions-answer as few or as many as you wish.
          Each correct answer sharpens the image and drops a letter into your
          word puzzle, bringing you closer to the secret word. Bonus: snag a fun
          fact with every question to flex your brain!
        </p>
        <div className="imageContainerTutorial">
          <img
            className="tutorialImage"
            src="https://res.cloudinary.com/dzpne110u/image/upload/v1713042616/tutorial2_quqcqc.png"
            alt="image shows the quiz question page and how answering a question correctly reveals more letters to the answer word"
          />
        </div>
      </section>
      <section className="buttonSectionTutorial">
        <Link className="link" to="/howtoplay/3">
          <button className="button">NEXT</button>
        </Link>
        <Link className="link" to="/">
          <button className="button" id="howToPlayHomeButton">
            HOME
          </button>
        </Link>
      </section>
    </>
  );
}
