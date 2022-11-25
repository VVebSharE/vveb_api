import axios from 'axios'

const API_URL = '/api/projects/'

// create new project
const createProject = async ( projectData, token)=>{
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,projectData ,config)

    return response.data
}

// get user project
const getProjects = async (token)=>{
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL,config)

    return response.data
}

// Delete user project
const deleteProject = async (projectID,token)=>{
    const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+projectID,config)

    return response.data
}

const projectService ={
    createProject,
    getProjects,
    deleteProject,
}

export default projectService