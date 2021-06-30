import React, { useState } from "react";
import topics from "./topics.json";
import ReactWordcloud from "react-wordcloud";
import DetailsContainer from "./DetailsContainer";

function App() {
  const [selectedWord, setSelectedWord] = useState({});

  const valueToAssign = (number) => {
    if (number > 50) {
      return 60;
    } else if (number <= 50 && number > 30) {
      return 40;
    } else if (number <= 30 && number > 20) {
      return 30;
    } else if (number <= 20 && number > 10) {
      return 20;
    } else if (number <= 10 && number > 5) {
      return 10;
    } else {
      return 5;
    }
  };

  const words = Object.values(topics)[0].map((topic) => {
    return {
      id: topic.id,
      text: topic.label,
      value: valueToAssign(topic.volume),
      popularity: topic.volume,
      score: topic.sentimentScore,
      negativeSentiment: topic.sentiment.negative
        ? topic.sentiment.negative
        : 0,
      neutralSentiment: topic.sentiment.neutral ? topic.sentiment.neutral : 0,
      positiveSentiment: topic.sentiment.positive
        ? topic.sentiment.positive
        : 0,
    };
  });

  const options = {
    enableTooltip: false,
    deterministic: true,
    fontFamily: "impact",
    fontSizes: [15, 65],
    fontStyle: "normal",
    padding: 5,
    spiral: "archimedean",
  };

  const callbacks = {
    getWordColor: (word) => {
      if (word.score > 60) {
        return "green";
      } else if (word.score < 40) {
        return "red";
      } else {
        return "grey";
      }
    },
    onWordClick: (word) => setSelectedWord(word),
  };

  return (
    <div>
      <h1 className="header">My topics cloud</h1>
      <div className="app-container">
        <div className="word-cloud-container">
          <ReactWordcloud
            callbacks={callbacks}
            words={words}
            options={options}
          />
        </div>
        <DetailsContainer selectedWord={selectedWord} />
      </div>
    </div>
  );
}

export default App;
