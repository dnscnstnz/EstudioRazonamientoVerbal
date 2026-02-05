function PracticeScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  timeLeft,
  onAnswer,
}) {
  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div>
      <p>
        ⏱ Tiempo restante:{" "}
        <strong>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </strong>
      </p>

      <p>
        Pregunta {currentIndex + 1} de {totalQuestions}
      </p>

      <div style={{ background: "#eee", height: "10px", marginBottom: "10px" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#4caf50",
          }}
        />
      </div>

      {/* Contenedor del texto con altura máxima de 1/4 de pantalla */}
      <div
        style={{
          maxHeight: "25vh", // máximo un cuarto de la pantalla
          overflowY: "auto", // scroll interno si el texto es largo
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
          maxWidth: "600px", // ancho máximo para que no ocupe toda la pantalla
          whiteSpace: "pre-line", // respeta saltos de línea en el texto
          fontSize: "16px",
          lineHeight: "1.5em",
        }}
      >
        <strong>Texto:</strong>
        <p style={{ margin: 0 }}>{currentQuestion.text}</p>
      </div>

      <p>
        <strong>Pregunta:</strong> {currentQuestion.question}
      </p>

      <ul>
        {currentQuestion.options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onAnswer(index)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PracticeScreen;
