import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import ProjectItem from '../ProjectItem'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

class ProjectHome extends Component {
  state = {isLoading: true, projectsList: [], category: '', isFailure: false}

  componentDidMount() {
    const {catList} = this.props

    this.setState({category: catList[0].id}, this.getProjects)
  }

  getProjects = async () => {
    const {category} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.projects.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.image_url,
      }))
      this.setState({
        projectsList: updatedData,
        isLoading: false,
        isFailure: false,
      })
    } else {
      this.setState({isLoading: false, isFailure: true})
    }
  }

  onClickRetry = () => {
    this.getProjects()
  }

  onChangeCategory = event => {
    this.setState({category: event.target.value}, this.getProjects)
  }

  renderProjects = () => {
    const {projectsList} = this.state
    return (
      <ul className="projects-list">
        {projectsList.map(eachProject => (
          <ProjectItem key={eachProject.id} projectsDetails={eachProject} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png "
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button onClick={this.onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  render() {
    const {category, isLoading, isFailure} = this.state
    const {catList} = this.props

    return (
      <div className="projects-bg">
        <div className="header">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png "
            alt="website logo"
          />
        </div>
        <select onChange={this.onChangeCategory} className="category-selector">
          {catList.map(each => (
            <option key={each.id} value={each.id}>
              {each.displayText}
            </option>
          ))}
        </select>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <>{isFailure ? this.renderFailureView() : this.renderProjects()}</>
        )}
      </div>
    )
  }
}

export default ProjectHome
