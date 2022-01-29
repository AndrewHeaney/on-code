import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectTile from "../components/project-tile"
import ArtistDive from "../images/artist-dive.png"
import UC from "../images/uc.png"
import Gito from "../images/gito.png"
import Jkx from "../images/jkx.png"

import "../components/project-tile.css"

const IndexPage = () => (
  <Layout>
    <SEO title="Projects" />
    <h1 style={{ textAlign: "center", marginBottom: "60px" }}>Projects</h1>
    <div id="row">
      <div id="col">
        <ProjectTile
          title="Unidays Companion"
          image={UC}
          href={
            "https://chrome.google.com/webstore/detail/unidays-companion/aagdmokijggnnehohbkjkphpllmpmlgm?hl=en-GB"
          }
        />
        <ProjectTile
          title="GITO"
          image={Gito}
          href={"https://github.com/AndrewHeaney/gito"}
        />
      </div>
      <div id="col">
        <ProjectTile
          title="Artist Dive"
          image={ArtistDive}
          href={"https://artistdive.glitch.me/"}
        />
        <ProjectTile
          title="JKX"
          image={Jkx}
          href={"https://github.com/AndrewHeaney/json-key-explorer"}
        />
      </div>
    </div>
  </Layout>
)

export default IndexPage
