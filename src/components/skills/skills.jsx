import { SkillItem } from "./skill items.jsx";
import { deleteSkill } from "./deleteSkills.js";
import { uploadSkill } from "./uploadSkills.js";
import { useUserStore } from "../../store/userStore.js";

export function Skills() {
  const { user } = useUserStore();
  const { skills = {} } = user || {};

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-3">Skills</h2>

      <div className="flex flex-wrap gap-3">
        {Object.keys(skills).map((skillKey) => (
          <SkillItem
            key={skillKey}
            skillKey={skillKey}
            onSave={uploadSkill}
            onDelete={deleteSkill}
          />
        ))}

        {/* Add new skill */}
        <SkillItem
          key="new-skill"
          skillKey=""
          onSave={uploadSkill}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}
