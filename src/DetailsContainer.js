import React from "react";

const DetailsContainer = ({ selectedWord }) => {
  const {
    id,
    text,
    value,
    score,
    negativeSentiment,
    neutralSentiment,
    positiveSentiment,
  } = selectedWord;

  const emojiDisplay = (score) => {
    if (score && score > 60) {
      return "https://openmoji.org/data/color/svg/1F929.svg";
    } else if (score && score < 40) {
      return "https://openmoji.org/data/color/svg/2639.svg";
    } else if (score && score <= 60 && score >= 40) {
      return "https://openmoji.org/data/color/svg/1F610.svg";
    } else {
      return "https://openmoji.org/data/color/svg/1F914.svg";
    }
  };

  return (
    <div className="details">
      <h3>How do people find me?</h3>
      <img
        src={emojiDisplay(score)}
        alt="emoji display"
        className="emoji"
        data-testid="emoji-test"
      />
      {Object.keys(selectedWord).length === 0 ? null : (
        <div key={id} data-testid="details-container">
          <h4 data-testid="details-text">Information on {text}:</h4>
          <p data-testid="total-mentions">
            Total mentions on social media: {value}
          </p>
          <div>
            <p>Positive Mentions: </p>
            <span data-testid="total-positives">{positiveSentiment}</span>
            <p>Neutral Mentions: </p>
            <span data-testid="total-neutral">{neutralSentiment}</span>
            <p>Negative Mentions: </p>
            <span data-testid="total-negative">{negativeSentiment}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsContainer;
