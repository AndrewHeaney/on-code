import React from "react"
import styled from "@emotion/styled"
import "./project-tile.css"

const ProjectTile = ({ title, image, href }) => (
  <div id={"container"}>
    <a href={href}>
      <img src={image} />
      <h5>{title}</h5>
    </a>
  </div>
)

export default ProjectTile
