function ResultsScreen({ practiceQuestions, userAnswers, results, onRestart }) {
  return (
    <div>
      <div className="results-header">
        <h1>Práctica terminada</h1>
        <p>Resumen de resultados</p>
      </div>

      <div className="results-stats">
        <div className="stat-card">
          <h3 style={{ color: "#10b981" }}>{results.correct}</h3>
          <p>✅ Correctas</p>
        </div>
        <div className="stat-card">
          <h3 style={{ color: "#ef4444" }}>{results.incorrect}</h3>
          <p>❌ Incorrectas</p>
        </div>
      </div>

      <div className="separator"></div>

      <h2>Detalle de respuestas</h2>

      <ul className="answers-list">
        {practiceQuestions.map((q, index) => {
          const userAnswerIndex = userAnswers[index];
          const isCorrect = userAnswerIndex === q.correctAnswer;
          const userAnswerText = q.options[userAnswerIndex] || "No respondida";
          const correctAnswerText = q.options[q.correctAnswer];

          return (
            <li
              key={q.id || index}
              className={`answer-item ${isCorrect ? "correct" : "incorrect"}`}
            >
              <p>
                <strong>Pregunta {index + 1}:</strong> {q.question}
              </p>

              <p className="mt-20">
                <strong>Texto:</strong> {q.text}
              </p>

              <p className="mt-20">
                <strong>Tu respuesta:</strong>{" "}
                <span style={{ color: isCorrect ? "#10b981" : "#ef4444" }}>
                  {userAnswerText}
                </span>
              </p>

              {!isCorrect && (
                <p className="mt-20">
                  <strong>Respuesta correcta:</strong>{" "}
                  <span style={{ color: "#10b981" }}>{correctAnswerText}</span>
                </p>
              )}

              {q.explanation && (
                <div className="explanation-box">
                  💡 <strong>Explicación:</strong> {q.explanation}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <button className="back-button" onClick={onRestart}>
        Volver al inicio
      </button>
    </div>
  );
}

export default ResultsScreen;
