import React from 'react'
import Button from "@material-ui/core/Button"
import { useHistory } from "react-router-dom"

const LinkButton = ({ path, children }) => {
  const history = useHistory()
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => history.push(path)}
    >
      {children}
    </Button>
  )
}

export default LinkButton
