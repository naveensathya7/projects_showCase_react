import './index.css'

const ProjectItem = props => {
  const {projectsDetails} = props
  const {name, imageUrl} = projectsDetails

  return (
    <li className="project-item">
      <img className="project-image" src={imageUrl} alt={name} />
      <p className="project-name">{name}</p>
    </li>
  )
}
export default ProjectItem
