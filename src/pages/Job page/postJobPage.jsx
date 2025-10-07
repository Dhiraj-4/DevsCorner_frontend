import { CoolButton } from "../../components/Buttons/button.jsx";
import { Input } from "../../components/Inputs/input.jsx";
import { useJobStore } from "../../store/jobPostStore.js";
import { CreateJobHeader } from "../../components/headers/createJobHeader.jsx";
import { createJobHandler } from "../../utils/createJobHandler.js";
import { Error } from "../../components/errors/error.jsx";
import { useAuthStore } from "../../store/authStore.js";
import { IsLoadingSvg } from "../../components/loaders/isLoadingSvg.jsx";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import { TextArea } from "../../components/Inputs/textArea.jsx";
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)

export function PostJobPage() {

    const {
        text,
        setText,

        role,
        setRole,

        companyName,
        setCompanyName,

        applyLink,
        setApplyLink
    } = useJobStore();

    const {
        isLoading
    } = useAuthStore();

    const navigate = useNavigate();
    return (
        <div className="primary-bg">

            {/* Header */}
            <CreateJobHeader/>
            <form
                action="/jobs"
                onSubmit={async(e) => {
                e.preventDefault();
                let success = await createJobHandler();
                if(success) {
                    navigate("/jobs");
                }
                }}
                className="primary-form"
            >

                {/* Error */}
                <Error />

<<<<<<< HEAD
                {/* Description */}
                <Input 
                    placeholder={"Description"}
                    value={text}
                    set={setText}
                    minLength={50}
                    name={"Description"}
                    type={"text"}
                    autoComplete={"Description"}
=======
                {/* Company Name */}
                <Input 
                    placeholder={"Company Name (optional)"}
                    value={companyName}
                    set={setCompanyName}
                    required={false}
                    minLength={1}
                    name={"companyName"}
                    type={"text"}
                    autoComplete={"companyName"}
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
                />

                {/* Role */}
                <Input 
                    placeholder={"Role"}
                    value={role}
                    set={setRole}
                    minLength={5}
                    name={"Role"}
                    type={"text"}
                    autoComplete={"Role"}
                />

                {/* Apply Link */}
                <Input 
                    placeholder={"Apply Link (optional)"}
                    value={applyLink}
                    set={setApplyLink}
                    required={false}
                    minLength={0}
                    name={"applyLink"}
                    type={"text"}
                    autoComplete={"applyLink"}
                />

<<<<<<< HEAD
                {/* Company Name */}
                <Input 
                    placeholder={"Company Name (optional)"}
                    value={companyName}
                    set={setCompanyName}
                    required={false}
                    minLength={1}
                    name={"companyName"}
                    type={"text"}
                    autoComplete={"companyName"}
=======

                {/* Description */}
                <TextArea 
                    placeholder={"Description"}
                    value={text}
                    set={setText}
                    minLength={50}
                    name={"Description"}
                    type={"text"}
                    autoComplete={"Description"}
>>>>>>> d724ff7 (whole basic job's CRUD flow is done, today added udpate to applyLink and description and delete button to delete job)
                />

                <CoolButton text={
                    (isLoading) ? <IsLoadingSvg/> : "Post Job"
                }/>

            </form>
        </div>
    )
}