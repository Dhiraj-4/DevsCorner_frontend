import { useUserStore } from "../store/userStore";

export function FollowersAndFollowing() {
  const { user } = useUserStore();

  return (
    <div className="flex justify-center md:justify-start gap-8 mt-4">
      {/* Followers */}
      <div className="flex flex-col items-center">
        <p className="text-lg md:text-xl font-semibold text-foreground">
          {user.countFollowers ?? 0}
        </p>
        <p className="text-sm text-muted-foreground">Followers</p>
      </div>

      {/* Divider (for better visual balance on larger screens) */}
      <div className="hidden md:block w-px h-8 bg-border" />

      {/* Following */}
      <div className="flex flex-col items-center">
        <p className="text-lg md:text-xl font-semibold text-foreground">
          {user.countFollowing ?? 0}
        </p>
        <p className="text-sm text-muted-foreground">Following</p>
      </div>
    </div>
  );
}