import React from 'react'
import PropTypes from 'prop-types'

const RepoItem = ({ repo }) => {
    return (
        <div>
            <a href={repo.html_url}>{repo.name}</a>
        </div>
    )
}

RepoItem.protoTypes = {
    repo: PropTypes.object.isRequired,
}
export default RepoItem
