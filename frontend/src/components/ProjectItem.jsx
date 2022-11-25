import {useDispatch} from 'react-redux'
import {deleteProject} from '../features/projects/projectSlice'

function ProjectItem({project}) {
    const dispatch = useDispatch()

  return (
    <div className="project">
        <div>
            {new Date(project.createdAt).toLocaleString('en-US')}
            <h2>
                {project.name}
                Name
            </h2>
            <button onClick={()=>dispatch(deleteProject(project._id))} className="close">X</button>
        </div>
    </div>
  )
}

export default ProjectItem