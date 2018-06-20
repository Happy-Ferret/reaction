import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"
import { AuctionBidInfo } from "Styleguide/Pages/Artwork/Sidebar/AuctionBidInfo"
import {
  ClosedAuctionArtwork,
  OpenAuctionArtwork,
} from "Styleguide/Pages/Fixtures/Artwork/Sidebar/AuctionBidInfo"

storiesOf("Styleguide/Artwork/Sidebar", module).add(
  "AuctionPartnerInfo",
  () => {
    return (
      <React.Fragment>
        <Section title="Closed auction">
          <AuctionBidInfo artwork={ClosedAuctionArtwork} />
        </Section>
        <Section title="Open auction">
          <AuctionBidInfo artwork={OpenAuctionArtwork} />
        </Section>
      </React.Fragment>
    )
  }
)
