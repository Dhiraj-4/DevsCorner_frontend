import { useUserStore } from "../../store/userStore";
import { uploadGithubLink } from "./uploadGithubLink";
import { deleteGithubLink } from "./deleteGithubLink";
import { SocialLinkItem } from "./socialLinkItem.jsx";
import { uploadTwitterLink } from "./uploadTwitterLink.js";
import { deleteTwitterLink } from "./deleteTwitterLink.js";
import { deleteLinkedinLink } from "./deleteLinkedinLink.js";
import { uploadLinkedinLink } from "./uploadLinkedinLink.js";

export function SocialLinks() {
  const { user, error } = useUserStore();
  const { socialLinks = {} } = user || {};
  const { github = "", linkedin = "", twitter = "" } = socialLinks;

  return (
    <div className="mt-10">

        <h2 className="text-xl font-semibold text-white mb-3">Social Links</h2>

      <div className="flex flex-wrap gap-3">
        <SocialLinkItem
          label="GitHub"
          link={github}
          onSave={uploadGithubLink}
          onDelete={deleteGithubLink}
        />

        <SocialLinkItem
          label="Twitter"
          link={twitter}
          onSave={uploadTwitterLink}
          onDelete={deleteTwitterLink}
        />

        <SocialLinkItem
          label="LinkedIn"
          link={linkedin}
          onSave={uploadLinkedinLink}
          onDelete={deleteLinkedinLink}
        />
      </div>
    </div>
  );
}
