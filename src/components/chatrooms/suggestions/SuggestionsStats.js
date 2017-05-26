import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

const SuggestionsStats = (props) => {
  console.log('Stats render')
  const { suggestions } = props

  const data = suggestions.filter(sug => sug.voters.length)
    .map(sug => (
      { name: sug.title, value: sug.voters.length }
    ))

  return (
    <ResponsiveContainer height={400} width='100%'>
      <PieChart>
        <Pie data={data} innerRadius='50%' outerRadius='60%' fill="#8884d8"  paddingAngle={5} label={(obj) => obj.payload.name} />
        <Tooltip/>
      </PieChart>
    </ResponsiveContainer>
  )
}

SuggestionsStats.propTypes = {
  suggestions: PropTypes.array
}
SuggestionsStats.defaultProps = {
  suggestions: []
}

export default SuggestionsStats