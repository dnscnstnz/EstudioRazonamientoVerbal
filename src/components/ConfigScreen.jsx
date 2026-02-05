import React from "react";

function ConfigScreen({
  duration,
  setDuration,
  questionTypes,
  setQuestionTypes,
  difficultyFilters, // Nuevo prop: ['easy', 'medium', 'hard']
  setDifficultyFilters, // Nuevo prop
  onStart,
}) {
  // Generamos opciones de 5 a 30 minutos
  const timeOptions = Array.from({ length: 26 }, (_, i) => i + 5);

  // Cálculo de preguntas para "presión":
  // Por ejemplo, 1.2 minutos por pregunta (Dura / 1.2)
  const estimatedQuestions = Math.floor(duration / 1.2);

  const handleDifficultyChange = (level) => {
    if (difficultyFilters.includes(level)) {
      setDifficultyFilters(difficultyFilters.filter((d) => d !== level));
    } else {
      setDifficultyFilters([...difficultyFilters, level]);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>Configura tu práctica</h1>

      <section>
        <label>
          <strong>Duración del simulacro:</strong>
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          style={{ width: "100%", padding: "8px", margin: "10px 0" }}
        >
          {timeOptions.map((t) => (
            <option key={t} value={t}>
              {t} minutos
            </option>
          ))}
        </select>
      </section>

      <hr />

      <section>
        <h3>Tipos de preguntas</h3>
        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={questionTypes.includes("multiple")}
            onChange={(e) => {
              e.target.checked
                ? setQuestionTypes([...questionTypes, "multiple"])
                : setQuestionTypes(
                    questionTypes.filter((t) => t !== "multiple"),
                  );
            }}
          />{" "}
          Selección múltiple
        </label>

        <label style={{ display: "block", marginBottom: "8px" }}>
          <input
            type="checkbox"
            checked={questionTypes.includes("true_false")}
            onChange={(e) => {
              e.target.checked
                ? setQuestionTypes([...questionTypes, "true_false"])
                : setQuestionTypes(
                    questionTypes.filter((t) => t !== "true_false"),
                  );
            }}
          />{" "}
          Verdadero / Falso / No se dice
        </label>
      </section>

      <hr />

      <section>
        <h3>Dificultad</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["easy", "medium", "hard"].map((level) => (
            <label key={level} style={{ textTransform: "capitalize" }}>
              <input
                type="checkbox"
                checked={difficultyFilters.includes(level)}
                onChange={() => handleDifficultyChange(level)}
              />{" "}
              {level === "easy"
                ? "Fácil"
                : level === "medium"
                  ? "Media"
                  : "Difícil"}
            </label>
          ))}
        </div>
      </section>

      <br />

      <button
        onClick={onStart}
        disabled={questionTypes.length === 0 || difficultyFilters.length === 0}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Comenzar práctica
      </button>

      {(questionTypes.length === 0 || difficultyFilters.length === 0) && (
        <p style={{ color: "red", fontSize: "0.8em" }}>
          * Selecciona al menos un tipo y una dificultad
        </p>
      )}
    </div>
  );
}

export default ConfigScreen;
