import {Helmet} from 'react-helmet-async';
import ProjectView from "../sections/active-loads/active-loads-view";

export default function ProjectsLoadPage() {
    return (
        <>
            <Helmet>
                <title> Projects  </title>
            </Helmet>

            <ProjectView/>
        </>
    );
}
