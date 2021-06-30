import { render, screen } from "@testing-library/react";
import DetailsContainer from "./DetailsContainer";

const correctObj = {
  text: "word",
  popularity: 1,
  score: 10,
  negativeSentiment: 2,
  neutralSentiment: 3,
  positiveSentiment: 4,
};

const happyEmoji = {
  score: 100,
};

const neutralEmoji = {
  score: 45,
};

describe("DetailsContainer", () => {
  test("component includes the details component when word details are passed to state", () => {
    render(<DetailsContainer selectedWord={"word"} />);
    expect(screen.getByTestId("details-container")).toBeInTheDocument();
  });

  test("word is displayed when passed as props", () => {
    render(<DetailsContainer selectedWord={correctObj} />);
    expect(screen.getByTestId("details-text")).toHaveTextContent("word");
  });

  test("popularity is displayed when passed as props", () => {
    render(<DetailsContainer selectedWord={correctObj} />);
    expect(screen.getByTestId("total-mentions")).toHaveTextContent("1");
  });

  test("positiveSentiment is displayed when passed as props", () => {
    render(<DetailsContainer selectedWord={correctObj} />);
    expect(screen.getByTestId("total-positives")).toHaveTextContent("4");
  });

  test("neutralSentiment is displayed when passed as props", () => {
    render(<DetailsContainer selectedWord={correctObj} />);
    expect(screen.getByTestId("total-neutral")).toHaveTextContent("3");
  });

  test("negativeSentiment is displayed when passed as props", () => {
    render(<DetailsContainer selectedWord={correctObj} />);
    expect(screen.getByTestId("total-negative")).toHaveTextContent("2");
  });

  test("emojiDisplay to be called once", () => {
    render(<DetailsContainer selectedWord={correctObj} />);
    const emojiDisplay = jest.fn();
    emojiDisplay();
    expect(emojiDisplay.mock.calls.length).toBe(1);
  });

  test("happy emoji is displayed with score > 60", () => {
    render(<DetailsContainer selectedWord={happyEmoji} />);
    const element = screen.getByTestId("emoji-test");
    expect(element.src).toBe("https://openmoji.org/data/color/svg/1F929.svg");
  });

  test("neutral emoji is displayed with score <= 60 and >= 40", () => {
    render(<DetailsContainer selectedWord={neutralEmoji} />);
    const element = screen.getByTestId("emoji-test");
    expect(element.src).toBe("https://openmoji.org/data/color/svg/1F610.svg");
  });

  test("sad emoji is displayed with score <= 60 and >= 40", () => {
    render(<DetailsContainer selectedWord={correctObj} />);
    const element = screen.getByTestId("emoji-test");
    expect(element.src).toBe("https://openmoji.org/data/color/svg/2639.svg");
  });

  test("thinking emoji is displayed when score is undefined", () => {
    render(<DetailsContainer selectedWord={{}} />);
    const element = screen.getByTestId("emoji-test");
    expect(element.src).toBe("https://openmoji.org/data/color/svg/1F914.svg");
  });
});
