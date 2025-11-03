// src/components/errors/error.jsx
import { useAuthStore } from "../../store/authStore.js";

export function Error() {
  const { error } = useAuthStore();

  if (!error) return null;

  return (
    <div
      role="alert"
      className="w-full rounded-md px-3 py-2 bg-red-50 border border-red-200 text-red-700 text-sm"
    >
      {error}
    </div>
  );
}