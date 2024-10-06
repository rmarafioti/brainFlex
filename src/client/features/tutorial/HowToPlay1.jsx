import { Link } from "react-router-dom";

import "./howToPlay.css";

/**
 *
 * @component HowToPlay1 returns a tutorial page on ow to play the quiz game.
 */
export default function HowToPlay1() {
  return (
    <>
      <section className="howToPlaySection">
        <h1 className="howToPlayHeader">🌟 Step 1: </h1>
        <h2 className="howToPlayTagline">Choose Your Adventure!</h2>
        <p className="howToPlayInstructions">
          Pick a topic and let the game begin. You’ll get a mysterious blurred
          image and a word puzzle of empty letters waiting to reveal a secret
          word related to your chosen theme. It’s your brain’s warm-up!
        </p>
        <div className="imageContainerTutorial">
          <img
            className="tutorialImage"
            src="https://res.cloudinary.com/dzpne110u/image/upload/v1713042607/tutorial1_vknskc.png"
            alt="image shows how to pick a topic and what the starting game page looks like"
          />
        </div>
      </section>
      <section className="buttonSectionTutorial">
        <Link className="link" to="/howtoplay/2">
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
