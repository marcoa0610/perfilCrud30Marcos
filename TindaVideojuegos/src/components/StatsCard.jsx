import "../css/StatsCard.css";

const StatsCard = ({ number, label, icon, color = "default" }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <div className="stats-number">{number}</div>
        <div className="stats-label">{label}</div>
      </div>
    </div>
  );
};

export default StatsCard;
