import React, { useState } from 'react'

const App = () => {
    const [ good, setGood ] = useState(0)
    const [ neutral, setNeutral ] = useState(0)
    const [ bad, setBad ] = useState(0)
return (
    <div>
        <h1>Give feetback, please</h1>
            <div>
            <button onClick={() => setGood(good + 1)}>
            good
            </button>&nbsp;
            <button onClick={() => setNeutral(neutral + 1)}>
            neutral
            </button>&nbsp;
            <button onClick={() => setBad(bad + 1)}>
            bad
            </button>       
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
            
    </div>
)
}

const StatisticsTableRow = (props) => <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
</tr>

const Statistics = ({good, neutral, bad}) => {
    const allClicks = good + neutral + bad
    if (allClicks===0) {
        return <>
         <h1>statistics</h1>
        No feedback given
        </>
    }
    return <>
            <h1>statistics</h1>
            {/* <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
            <br /><br />
            <div>allClicks{allClicks}</div>
            <div>average {(good * 1 + bad * (-1))/allClicks}</div>
            <div> positive feedback {(good/allClicks*100)}</div> */}
            <table>
                <StatisticsTableRow text="good" value={good} />
                <StatisticsTableRow text="neutral" value={neutral} />
                <StatisticsTableRow text="bad" value={bad} />
                <StatisticsTableRow text="All Clicks" value={allClicks} />
                <StatisticsTableRow text="Average" value={(good * 1 + bad * (-1))/allClicks}/>
                <StatisticsTableRow text="Positive" value={(good/allClicks*100) + '%'} />
            </table>
        </>
  }

export default App