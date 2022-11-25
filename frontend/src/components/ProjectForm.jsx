import { useState } from "react";
import { useDispatch } from "react-redux";
import {createProject} from '../features/projects/projectSlice'

function ProjectForm() {
    const [name, setName] = useState("");

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(createProject({name}))

        setName('')
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Project</label>
                    <input
                        type="name"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Project
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ProjectForm;
