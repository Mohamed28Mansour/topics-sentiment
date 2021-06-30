import React from "react";

const DetailsContainer = ({ selectedWord }) => {
  const {
    id,
    text,
    popularity,
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
      <h3 className="details-header" data-testid="details-text">
        How do people find {text ? text : "me?"}
      </h3>
      <img
        src={emojiDisplay(score)}
        alt="emoji display"
        className="emoji"
        data-testid="emoji-test"
      />
      {Object.keys(selectedWord).length === 0 ? null : (
        <div
          key={id}
          data-testid="details-container"
          className="details-container"
        >
          <p data-testid="total-mentions">
            Total mentions on social media: {popularity}
          </p>
          <ul className="sentiment-list">
            <li>
              Positive Mentions:
              <span data-testid="total-positives" className="positive">
                {positiveSentiment}
              </span>
            </li>
            <li>
              Neutral Mentions:
              <span data-testid="total-neutral" className="neutral">
                {neutralSentiment}
              </span>
            </li>
            <li>
              Negative Mentions:
              <span data-testid="total-negative" className="negative">
                {negativeSentiment}
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsContainer;
