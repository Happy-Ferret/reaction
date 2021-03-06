import {
  ClosedAuctionArtwork,
  LiveAuctionInProgeress,
  OpenAuctionNoReserveNoBids,
  OpenAuctionNoReserveWithBids,
  OpenAuctionReserveMetWithBids,
  OpenAuctionReserveMetWithMyLoosingBid,
  OpenAuctionReserveMetWithMyWinningBid,
  OpenAuctionReserveNoBids,
  OpenAuctionReserveNotMetWithBids,
} from "Apps/__test__/Fixtures/Artwork/Sidebar/CurrentBidInfo"
import { ArtworkSidebarCurrentBidInfo as CurrentBidInfo } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "Styleguide/Utils/Section"

storiesOf("Styleguide/Artwork/Sidebar", module).add("CurrentBidInfo", () => {
  return (
    <React.Fragment>
      <Section title="Closed auction">
        <CurrentBidInfo artwork={ClosedAuctionArtwork as any} />
      </Section>
      <Section title="Open auction no reserve no bids">
        <CurrentBidInfo artwork={OpenAuctionNoReserveNoBids as any} />
      </Section>
      <Section title="Open auction no reserve with bids">
        <CurrentBidInfo artwork={OpenAuctionNoReserveWithBids as any} />
      </Section>
      <Section title="Open auction with reserve and no bids">
        <CurrentBidInfo artwork={OpenAuctionReserveNoBids as any} />
      </Section>
      <Section title="Open auction reserve not met with bids">
        <CurrentBidInfo artwork={OpenAuctionReserveNotMetWithBids as any} />
      </Section>
      <Section title="Open auction reserve met with bids">
        <CurrentBidInfo artwork={OpenAuctionReserveMetWithBids as any} />
      </Section>
      <Section title="Open auction with my bid winning">
        <CurrentBidInfo
          artwork={OpenAuctionReserveMetWithMyWinningBid as any}
        />
      </Section>
      <Section title="Open auction with my bid loosing">
        <CurrentBidInfo
          artwork={OpenAuctionReserveMetWithMyLoosingBid as any}
        />
      </Section>
      <Section title="Live auction in progress">
        <CurrentBidInfo artwork={LiveAuctionInProgeress as any} />
      </Section>
    </React.Fragment>
  )
})
