import { useUserStore } from "../../store/userStore";
import { useTheme } from "../../theme-provider.jsx";
import { uploadGithubLink } from "./uploadGithubLink";
import { deleteGithubLink } from "./deleteGithubLink";
import { uploadTwitterLink } from "./uploadTwitterLink.js";
import { deleteTwitterLink } from "./deleteTwitterLink.js";
import { uploadLinkedinLink } from "./uploadLinkedinLink.js";
import { deleteLinkedinLink } from "./deleteLinkedinLink.js";
import { SocialLinkItem } from "./socialLinkItem.jsx";

export function SocialLinks() {
  const { user, setUser } = useUserStore();
  const { activeTheme } = useTheme();
  const { socialLinks = {} } = user || {};
  const { github = "", linkedin = "", twitter = "" } = socialLinks;

  const isDark = activeTheme === "dark";
  const titleColor = isDark ? "text-zinc-100" : "text-zinc-900";

  return (
    <div>
      <h2 className={`text-xl font-semibold mb-3 ${titleColor}`}>Social Links</h2>

      <div className="flex flex-wrap gap-3">
        <SocialLinkItem
          label="GitHub"
          link={github}
          onSave={async (newLink) => {
            let res = await uploadGithubLink(newLink);
            if (res.status === 200) {
              user.socialLinks.github = newLink;
              setUser(user);
            }
            return res;
          }}
          onDelete={async () => {
            let res = await deleteGithubLink();
            if (res.status === 200) {
              user.socialLinks.github = "";
              setUser(user);
            }
            return res;
          }}
        />

        <SocialLinkItem
          label="Twitter"
          link={twitter}
          onSave={async (newLink) => {
            let res = await uploadTwitterLink(newLink);
            if (res.status === 200) {
              user.socialLinks.twitter = newLink;
              setUser(user);
            }
            return res;
          }}
          onDelete={async () => {
            let res = await deleteTwitterLink();
            if (res.status === 200) {
              user.socialLinks.twitter = "";
              setUser(user);
            }
            return res;
          }}
        />

        <SocialLinkItem
          label="LinkedIn"
          link={linkedin}
          onSave={async (newLink) => {
            let res = await uploadLinkedinLink(newLink);
            if (res.status === 200) {
              user.socialLinks.linkedin = newLink;
              setUser(user);
            }
            return res;
          }}
          onDelete={async () => {
            let res = await deleteLinkedinLink();
            if (res.status === 200) {
              user.socialLinks.linkedin = "";
              setUser(user);
            }
            return res;
          }}
        />
      </div>
    </div>
  );
}
