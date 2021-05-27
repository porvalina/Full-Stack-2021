import React, { useState, useEffect } from 'react'

const FilterComponent = (props) => {
    return <div>
          filter: <input type="text" name="filter" 
                    onChange={props.filterHandler} value={props.filter} />
          </div>
  }

export default FilterComponent