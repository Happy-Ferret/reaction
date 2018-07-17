import { Sans } from "@artsy/palette"
import { MarketInsightsArtistPage_artist } from "__generated__/MarketInsightsArtistPage_artist.graphql"
import {
  hasSections,
  highestCategory,
} from "Components/Artist/MarketInsights/MarketInsights"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { BorderBox, Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Responsive } from "Utils/Responsive"

const wrapper = xs => props =>
  xs ? <Flex flexDirection="column" mb={1} {...props} /> : <Box {...props} />

export interface MarketInsightsProps {
  artist: MarketInsightsArtistPage_artist
}

const CATEGORIES = {
  "blue-chip": "Blue chip",
  "top-established": "Established",
  "top-emerging": "Emerging",
}
const CATEGORY_LABEL_MAP = {
  "blue-chip": "Represented by internationally recognized galleries.",
  "top-established": "Represented by industry leading galleries.",
  "top-emerging": "Represented by up-and-coming galleries.",
}

export class MarketInsights extends React.Component<MarketInsightsProps> {
  renderAuctionHighlight(xs: boolean) {
    const TextWrap = wrapper(xs)
    if (
      !this.props.artist.auctionResults ||
      this.props.artist.auctionResults.edges.length < 1
    ) {
      return null
    }
    const topAuctionResult = this.props.artist.auctionResults.edges[0].node
    const display = `${topAuctionResult.price_realized.display}, ${
      topAuctionResult.organization
    }, ${topAuctionResult.sale_date}`
    return (
      <TextWrap>
        <Sans size="2" weight="medium" display="inline" mr={1}>
          High auction record
        </Sans>
        <Sans size="2" display="inline" color="black60">
          {display}
        </Sans>
      </TextWrap>
    )
  }
  renderGalleryRepresentation(xs: boolean) {
    const TextWrap = wrapper(xs)
    const { highlights } = this.props.artist
    const { partners } = highlights
    if (partners && partners.edges && partners.edges.length > 0) {
      const highCategory = highestCategory(partners.edges)
      return (
        <TextWrap>
          <Sans size="2" weight="medium" display="inline" mr={1}>
            {CATEGORIES[highCategory]}
          </Sans>
          <Sans size="2" display="inline" color="black60">
            {CATEGORY_LABEL_MAP[highCategory]}
          </Sans>
        </TextWrap>
      )
    }
  }
  renderPermanentCollection(xs: boolean) {
    const TextWrap = wrapper(xs)
    const { collections } = this.props.artist
    if (!collections || collections.length === 0) {
      return null
    }
    const label =
      collections.length === 1
        ? "Collected by a major museum"
        : "Collected by major museums"
    return (
      <TextWrap>
        <Sans size="2" weight="medium" display="inline" mr={1}>
          {label}
        </Sans>
        <Sans size="2" display="inline" color="black60">
          {collections.join(", ")}
        </Sans>
      </TextWrap>
    )
  }

  render() {
    if (!hasSections(this.props.artist)) {
      return null
    }
    return (
      <BorderBox flexDirection="column">
        <Responsive>
          {({ xs }) => {
            return (
              <div>
                {this.renderAuctionHighlight(xs)}
                {this.renderGalleryRepresentation(xs)}
                {this.renderPermanentCollection(xs)}
              </div>
            )
          }}
        </Responsive>
      </BorderBox>
    )
  }
}

export const MarketInsightsFragmentContainer = createFragmentContainer(
  MarketInsights,
  graphql`
    fragment MarketInsightsArtistPage_artist on Artist
      @argumentDefinitions(
        partner_category: {
          type: "[String]"
          defaultValue: ["blue-chip", "top-established", "top-emerging"]
        }
      ) {
      _id
      collections
      highlights {
        partners(
          first: 10
          display_on_partner_profile: true
          represented_by: true
          partner_category: $partner_category
        ) {
          edges {
            node {
              categories {
                id
              }
            }
          }
        }
      }
      auctionResults(
        recordsTrusted: true
        first: 1
        sort: PRICE_AND_DATE_DESC
      ) {
        edges {
          node {
            price_realized {
              display(format: "0a")
            }
            organization
            sale_date(format: "YYYY")
          }
        }
      }
    }
  `
)
