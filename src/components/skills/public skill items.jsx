export function PublicSkillItem({ skillKey }) {

  return (
    <div className="flex items-center gap-2 text-white">
        <div className="flex justify-center items-center gap-2 bg-black rounded-2xl p-2">
          <span>{skillKey}</span>
        </div>
    </div>
  );
}