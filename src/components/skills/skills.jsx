import { SkillItem } from "./skill items.jsx";
import { deleteSkill } from "./deleteSkills.js";
import { uploadSkill } from "./uploadSkills.js";
import { useUserStore } from "../../store/userStore.js";
import { useTheme } from "../../theme-provider.jsx";

export function Skills() {
  const { user, setUser } = useUserStore();
  const { activeTheme } = useTheme();
  const { skills = {} } = user || {};

  const isDark = activeTheme === "dark";
  const titleColor = isDark ? "text-zinc-100" : "text-zinc-900";

  return (
    <div>
      <h2 className={`text-xl font-semibold mb-3 ${titleColor}`}>Skills</h2>

      <div className="flex flex-wrap gap-3">
        {Object.keys(skills).map((skillKey) => (
          <SkillItem
            key={skillKey}
            skillKey={skillKey}
            onSave={() => {}}
            onDelete={async () => {
              let res = await deleteSkill(skillKey);
              if (res.status === 200) {
                delete skills[skillKey];
                user.skills = skills;
                setUser(user);
              }
              return res;
            }}
          />
        ))}

        {/* Add new skill */}
        <SkillItem
          key="new-skill"
          skillKey=""
          onSave={async(skillKey) => {
            let res = await uploadSkill(skillKey);
            if(res.status === 200){
              skills[skillKey] = true;
              user.skills = skills;
              setUser(user);
            }
            return res;
          }}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}