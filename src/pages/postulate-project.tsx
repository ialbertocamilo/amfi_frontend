import { useEffect } from "react";
import { useRouter } from "next/router";

const PostulateProject: React.FC = () => {
    const router = useRouter();

    const { token } = router.query;
    useEffect(() => {
        if (token)
            router.push("/postulacion?token=" + token);
    }, [router, token]);

    return null;
};

export default PostulateProject;