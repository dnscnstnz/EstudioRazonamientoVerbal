function ResultsScreen({ practiceQuestions, userAnswers, results, onRestart }) {
  return (
    <div>
      <h1>Práctica terminada</h1>

      <p>✅ Correctas: {results.correct}</p>
      <p>❌ Incorrectas: {results.incorrect}</p>

      <hr />

      <h2>Detalle de respuestas</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {practiceQuestions.map((q, index) => {
          const isCorrect = userAnswers[index] === q.correctAnswer;
          return (
            <li
              key={q.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <p>
                <strong>Pregunta {index + 1}:</strong> {q.question}
              </p>

              <p>
                <strong>Texto:</strong> {q.text}
              </p>

              <p>
                Tu respuesta:{" "}
                <strong style={{ color: isCorrect ? "green" : "red" }}>
                  {q.options[userAnswers[index]]}
                </strong>
              </p>

              <p>
                Respuesta correcta:{" "}
                <strong style={{ color: "green" }}>
                  {q.options[q.correctAnswer]}
                </strong>
              </p>

              {isCorrect ? (
                <p style={{ color: "green" }}>
                  ✔ ¡Muy bien! Respuesta correcta.
                </p>
              ) : (
                <p style={{ color: "red" }}>✖ Incorrecta.</p>
              )}

              {/* Aquí se muestra la explicación si existe */}
              {q.explanation && (
                <p style={{ fontStyle: "italic", color: "white" }}>
                  💡 Explicación: {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <button onClick={onRestart}>Volver al inicio</button>
    </div>
  );
}

export default ResultsScreen;
