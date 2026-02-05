import React from "react";

function ConfigScreen({
  duration,
  setDuration,
  questionTypes,
  setQuestionTypes,
  difficultyFilters,
  setDifficultyFilters,
  onStart,
}) {
  const timeOptions = Array.from({ length: 26 }, (_, i) => i + 5);

  const handleDifficultyChange = (level) => {
    if (difficultyFilters.includes(level)) {
      setDifficultyFilters(difficultyFilters.filter((d) => d !== level));
    } else {
      setDifficultyFilters([...difficultyFilters, level]);
    }
  };

  return (
    <div>
      <h1>Configura tu práctica</h1>

      <div className="config-section">
        <label>
          <strong>Duración del simulacro:</strong>
        </label>
        <select
          className="config-select"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        >
          {timeOptions.map((t) => (
            <option key={t} value={t}>
              {t} minutos
            </option>
          ))}
        </select>
      </div>

      <div className="separator"></div>

      <div className="config-section">
        <h3>Tipos de preguntas</h3>
        <div className="checkbox-group">
          <label className="checkbox-item">
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
            />
            <span>Selección múltiple</span>
          </label>

          <label className="checkbox-item">
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
            />
            <span>Verdadero / Falso / No se dice</span>
          </label>
        </div>
      </div>

      <div className="separator"></div>

      <div className="config-section">
        <h3>Dificultad</h3>
        <div className="difficulty-grid">
          {["easy", "medium", "hard"].map((level) => (
            <div
              key={level}
              className={`difficulty-chip ${
                difficultyFilters.includes(level) ? "active" : ""
              }`}
              onClick={() => handleDifficultyChange(level)}
            >
              {level === "easy"
                ? "Fácil"
                : level === "medium"
                  ? "Media"
                  : "Difícil"}
            </div>
          ))}
        </div>
      </div>

      <button
        className="start-button"
        onClick={onStart}
        disabled={questionTypes.length === 0 || difficultyFilters.length === 0}
      >
        Comenzar práctica
      </button>

      {(questionTypes.length === 0 || difficultyFilters.length === 0) && (
        <p className="error-text">
          * Selecciona al menos un tipo y una dificultad
        </p>
      )}
    </div>
  );
}

export default ConfigScreen;
