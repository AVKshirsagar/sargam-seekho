export default function MascotPeacock({ bounce = false }) {
  return (
    <div className={`mascot ${bounce ? 'mascot--bounce' : ''}`} aria-hidden="true">
      🦚
    </div>
  );
}
