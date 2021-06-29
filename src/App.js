import React, { useState } from "react";
import topics from "./topics.json";
import ReactWordcloud from "react-wordcloud";
import DetailsContainer from "./DetailsContainer";

function App() {
  const [selectedWord, setSelectedWord] = useState({});

  const words = Object.values(topics)[0].map((topic) => {
    return {
      id: topic.id,
      text: topic.label,
      value: topic.volume,
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
    fontSizes: [10, 60],
    fontStyle: "normal",
    padding: 40,
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
    <div className="App">
      <div
        style={{
          height: "80%",
          width: "60%",
          backgroundColor: "lightBlue",
          display: "flex",
        }}
      >
        <ReactWordcloud callbacks={callbacks} words={words} options={options} />
      </div>
      <DetailsContainer selectedWord={selectedWord} />
    </div>
  );
}

export default App;
