import api from "../../config/axiosConfig.js";
import { BACKEND_URL } from "../../config/envConfig.js";
import { useAuthStore } from "../store/authStore.js";
<<<<<<< HEAD
=======
import { useJobStore } from "../store/jobPostStore.js";
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)

async function logoutHelper() {
    const {
        reset_authStore,
        setIsLogggedIn,
    } = useAuthStore.getState();

<<<<<<< HEAD
=======
    const {
        reset_jobStore
    } = useJobStore.getState();

>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
    const response = await api.post(
        `${BACKEND_URL}auth/logout`
    );
    reset_authStore();
<<<<<<< HEAD
=======
    reset_jobStore();
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
    setIsLogggedIn(false);
    console.log(response);
    return;
}

export { logoutHelper };