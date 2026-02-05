import React from "react";

const ProfileScreen = ({ onBack }) => {
  const stats = JSON.parse(localStorage.getItem("stats")) || {
    totalSessions: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    history: [],
  };

  const totalQuestions = stats.totalCorrect + stats.totalIncorrect;
  const globalAccuracy =
    totalQuestions > 0
      ? ((stats.totalCorrect / totalQuestions) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="profile-container">
      <h2>Mi Perfil de Entrenamiento</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalSessions}</h3>
          <p>Sesiones Completadas</p>
        </div>
        <div className="stat-card">
          <h3>{globalAccuracy}%</h3>
          <p>Precisión Global</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalCorrect}</h3>
          <p>Preguntas Correctas</p>
        </div>
      </div>

      <div className="separator"></div>

      <h3>Historial Reciente</h3>
      <div className="history-list">
        {stats.history.length > 0 ? (
          [...stats.history].reverse().map((session, i) => (
            <div key={i} className="history-item">
              <span>{session.date}</span>
              <span>
                {session.correct}✅ / {session.incorrect}❌
              </span>
              <span>{session.ratio}%</span>
            </div>
          ))
        ) : (
          <p className="text-center">No hay historial todavía</p>
        )}
      </div>

      <button className="back-button" onClick={onBack}>
        Volver al Inicio
      </button>
    </div>
  );
};

export default ProfileScreen;
