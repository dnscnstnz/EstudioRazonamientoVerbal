import { useState, useEffect, useMemo } from "react";
import { questions } from "./data/questions";
import ConfigScreen from "./components/ConfigScreen";
import PracticeScreen from "./components/PracticeScreen";
import ResultsScreen from "./components/ResultsScreen";
import ProfileScreen from "./components/ProfileScreen";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("config");
  const [duration, setDuration] = useState(5);
  const [questionTypes, setQuestionTypes] = useState([
    "multiple",
    "true_false",
  ]);
  const [difficultyFilters, setDifficultyFilters] = useState([
    "easy",
    "medium",
    "hard",
  ]);
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const currentQuestion = practiceQuestions[currentQuestionIndex] || null;

  const saveStats = (correct, incorrect) => {
    const savedStats = JSON.parse(localStorage.getItem("stats")) || {
      totalSessions: 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      history: [],
    };
    const newStats = {
      totalSessions: savedStats.totalSessions + 1,
      totalCorrect: savedStats.totalCorrect + correct,
      totalIncorrect: savedStats.totalIncorrect + incorrect,
      history: [
        ...savedStats.history,
        {
          date: new Date().toLocaleDateString(),
          correct,
          incorrect,
          ratio: ((correct / (correct + incorrect)) * 100).toFixed(1),
        },
      ],
    };
    localStorage.setItem("stats", JSON.stringify(newStats));
  };

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const getResults = () => {
    let correct = 0;
    userAnswers.forEach((answer, index) => {
      if (
        practiceQuestions[index] &&
        answer === practiceQuestions[index].correctAnswer
      ) {
        correct++;
      }
    });
    return { correct, incorrect: userAnswers.length - correct };
  };

  const results = useMemo(() => {
    return screen === "results" ? getResults() : { correct: 0, incorrect: 0 };
  }, [screen, userAnswers, practiceQuestions]);

  useEffect(() => {
    if (
      screen === "practice" &&
      practiceQuestions.length > 0 &&
      currentQuestionIndex >= practiceQuestions.length
    ) {
      const finalResults = getResults();
      saveStats(finalResults.correct, finalResults.incorrect);
      setScreen("results");
    }
  }, [currentQuestionIndex, screen]);

  useEffect(() => {
    if (screen !== "practice") return;
    if (timeLeft <= 0) {
      const finalResults = getResults();
      saveStats(finalResults.correct, finalResults.incorrect);
      setScreen("results");
      return;
    }
    const interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [screen, timeLeft]);

  return (
    <div className="app-container">
      <div className="screen-wrapper">
        {(screen === "config" || screen === "profile") && (
          <button
            className="profile-toggle-btn"
            onClick={() =>
              setScreen(screen === "config" ? "profile" : "config")
            }
          >
            {screen === "config"
              ? "📊 Ver Mis Estadísticas"
              : "⚙️ Ir a Configurar"}
          </button>
        )}

        {screen === "config" && (
          <ConfigScreen
            duration={duration}
            setDuration={setDuration}
            questionTypes={questionTypes}
            setQuestionTypes={setQuestionTypes}
            difficultyFilters={difficultyFilters}
            setDifficultyFilters={setDifficultyFilters}
            onStart={() => {
              const filteredQuestions = questions.filter(
                (q) =>
                  questionTypes.includes(q.type) &&
                  difficultyFilters.includes(q.difficulty),
              );
              const shuffled = shuffleArray(filteredQuestions);
              const totalToServe = Math.ceil(duration * 1.7);
              const selectedQuestions = shuffled.slice(0, totalToServe);
              setPracticeQuestions(selectedQuestions);
              setTimeLeft(duration * 60);
              setCurrentQuestionIndex(0);
              setUserAnswers([]);
              setScreen("practice");
            }}
          />
        )}

        {screen === "profile" && (
          <ProfileScreen onBack={() => setScreen("config")} />
        )}

        {screen === "practice" && (
          <PracticeScreen
            currentQuestion={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={practiceQuestions.length}
            timeLeft={timeLeft}
            selectedAnswer={userAnswers[currentQuestionIndex]}
            onAnswer={(optionIndex) => {
              const newAnswers = [...userAnswers];
              newAnswers[currentQuestionIndex] = optionIndex;
              setUserAnswers(newAnswers);
            }}
            onNext={() => setCurrentQuestionIndex((prev) => prev + 1)}
            onPrev={() => setCurrentQuestionIndex((prev) => prev - 1)}
            onFinish={() => setScreen("results")}
          />
        )}

        {screen === "results" && (
          <ResultsScreen
            practiceQuestions={practiceQuestions}
            userAnswers={userAnswers}
            results={results}
            onRestart={() => {
              setScreen("config");
              setCurrentQuestionIndex(0);
              setUserAnswers([]);
              setPracticeQuestions([]);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
