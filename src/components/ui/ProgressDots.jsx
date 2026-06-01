export default function ProgressDots({ total = 8, current = 0, correct = 0 }) {
  return (
    <div className="progress-dots">
      {Array.from({ length: total }, (_, i) => {
        let cls = 'progress-dot';
        if (i < correct) cls += ' progress-dot--correct';
        else if (i < current) cls += ' progress-dot--wrong';
        return <span key={i} className={cls} />;
      })}
    </div>
  );
}
