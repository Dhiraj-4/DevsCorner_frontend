import { useUserStore } from "../store/userStore"

export function FollowersAndFollowing() {
    const {
        user
    } = useUserStore();

    return (
        <div className="flex justify-center md:justify-start gap-6 mt-3">
          <div className="text-center">
            <p className="text-lg font-semibold text-white">
              {user.countFollowers ?? 0}
            </p>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-white">
              {user.countFollowing ?? 0}
            </p>
            <p className="text-sm text-gray-400">Following</p>
          </div>
        </div>
    )
}