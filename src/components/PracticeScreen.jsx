function PracticeScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  timeLeft,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrev,
  onFinish,
}) {
  if (!currentQuestion) {
    return (
      <div className="text-center">
        <p>Cargando pregunta...</p>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="practice-header">
        <div className="time-display">⏱ {formatTime(timeLeft)}</div>
        <div className="question-counter">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </div>
      </div>

      <div className="separator"></div>

      <div className="config-section">
        <strong>Texto:</strong>
        <div className="question-text">{currentQuestion.text}</div>
      </div>

      <div className="config-section">
        <strong>Pregunta:</strong> {currentQuestion.question}
      </div>

      <div className="checkbox-group">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedAnswer === index ? "active" : ""
            }`}
            onClick={() => onAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="separator"></div>

      <div className="nav-buttons">
        <button
          className="nav-btn nav-prev"
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          ← Anterior
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button className="nav-btn nav-next" onClick={onNext}>
            Siguiente →
          </button>
        ) : (
          <button className="nav-btn nav-next" onClick={onFinish}>
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
}

export default PracticeScreen;
