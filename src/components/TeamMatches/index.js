// Write your code here
// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    matchesData: [],
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()

    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        umpires: fetchedData.latest_match_details.umpires,
        result: fetchedData.latest_match_details.result,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        id: fetchedData.latest_match_details.id,
        date: fetchedData.latest_match_details.date,
        venue: fetchedData.latest_match_details.venue,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        // use value of the key 'competing_team' for alt as `latest match ${competing_team}`
        firstInnings: fetchedData.latest_match_details.first_innings,
        secondInnings: fetchedData.latest_match_details.second_innings,
        matchStatus: fetchedData.latest_match_details.match_status,
      },
      recentMatches: fetchedData.recent_matches.map(eachItem => ({
        umpires: eachItem.umpires,
        result: eachItem.result,
        manOfTheMatch: eachItem.man_of_the_match,
        id: eachItem.id,
        date: eachItem.date,
        venue: eachItem.venue,
        competingTeam: eachItem.competing_team,
        competingTeamLogo: eachItem.competing_team_logo,
        // use value of the key 'competing_team' for alt as `competing team ${competing_team}`
        firstInnings: eachItem.first_innings,
        secondInnings: eachItem.second_innings,
        matchStatus: eachItem.match_status,
      })),
    }
    console.log(updatedData)

    this.setState({isLoading: false, matchesData: updatedData})
  }

  renderTeamMatches = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchesData
    console.log(latestMatchDetails)
    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchData={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />{' '}
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'MI':
        return 'mi'
      case 'RR':
        return 'rr'
      case 'SRH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-match-route-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
