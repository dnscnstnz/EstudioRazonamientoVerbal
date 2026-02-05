import { useState, useEffect } from "react";
import { questions } from "./data/questions";
import ConfigScreen from "./components/ConfigScreen";
import PracticeScreen from "./components/PracticeScreen";
import ResultsScreen from "./components/ResultsScreen";

function App() {
  // ────────────────────
  // ESTADOS
  // ────────────────────
  const [screen, setScreen] = useState("config");
  const [duration, setDuration] = useState(5);
  const [questionTypes, setQuestionTypes] = useState([
    "multiple",
    "true_false",
  ]);

  // NUEVO: Estado para dificultades (por defecto todas marcadas)
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

  // ────────────────────
  // UTILIDADES
  // ────────────────────
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

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
    return {
      correct,
      incorrect: userAnswers.length - correct,
    };
  };

  const results =
    screen === "results" ? getResults() : { correct: 0, incorrect: 0 };

  // ────────────────────
  // EFECTOS
  // ────────────────────
  useEffect(() => {
    if (
      screen === "practice" &&
      practiceQuestions.length > 0 &&
      currentQuestionIndex >= practiceQuestions.length
    ) {
      setScreen("results");
    }
  }, [currentQuestionIndex, screen, practiceQuestions]);

  useEffect(() => {
    if (screen !== "practice") return;
    if (timeLeft <= 0) {
      setScreen("results");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [screen, timeLeft]);

  // ────────────────────
  // RENDER
  // ────────────────────
  return (
    <div>
      {/* CONFIGURACIÓN */}
      {screen === "config" && (
        <ConfigScreen
          duration={duration}
          setDuration={setDuration}
          questionTypes={questionTypes}
          setQuestionTypes={setQuestionTypes}
          // PASAMOS LAS NUEVAS PROPS
          difficultyFilters={difficultyFilters}
          setDifficultyFilters={setDifficultyFilters}
          onStart={() => {
            // 1. FILTRADO DOBLE: Tipo Y Dificultad
            const filteredQuestions = questions.filter(
              (q) =>
                questionTypes.includes(q.type) &&
                difficultyFilters.includes(q.difficulty),
            );

            // 2. Mezclar
            const shuffled = shuffleArray(filteredQuestions);

            // 3. LÓGICA DE PRESIÓN:
            // Si el usuario elige 10 min, le damos 13 preguntas (aprox 45 seg por pregunta)
            // Ajusta el multiplicador 1.3 según qué tanta presión quieras poner.
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

      {/* PRÁCTICA */}
      {screen === "practice" && (
        <PracticeScreen
          currentQuestion={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={practiceQuestions.length}
          timeLeft={timeLeft}
          onAnswer={(index) => {
            setUserAnswers([...userAnswers, index]);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }}
        />
      )}

      {/* RESULTADOS */}
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
  );
}

export default App;
