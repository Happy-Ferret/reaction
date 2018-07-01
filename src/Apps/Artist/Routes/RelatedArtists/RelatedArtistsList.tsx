import { RelatedArtistsList_artist } from "__generated__/RelatedArtistsList_artist.graphql"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtistCardFragmentContainer } from "Styleguide/Components/ArtistCard"
import { PaginationFragmentContainer } from "Styleguide/Components/Pagination"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Responsive } from "Utils/Responsive"

interface ShowProps {
  relay: RelayRefetchProp
  artist: RelatedArtistsList_artist
  kind: string
  scrollTo: string
}

export const PAGE_SIZE = 6

class RelatedArtistsList extends Component<ShowProps> {
  loadNext = () => {
    const {
      artist: {
        related: {
          artists: {
            pageInfo: { hasNextPage, endCursor },
          },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor)
    }
  }

  loadAfter = cursor => {
    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: this.props.artist.id,
        before: null,
        last: null,
        kind: this.props.kind,
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }
      }
    )
  }

  renderPagination() {
    return (
      <div>
        <PaginationFragmentContainer
          pageCursors={this.props.artist.related.artists.pageCursors as any}
          onClick={this.loadAfter}
          onNext={this.loadNext}
        />
      </div>
    )
  }

  render() {
    return (
      <Responsive>
        {({ xs, sm, md }) => {
          let width
          if (xs) {
            width = "100%"
          } else if (sm || md) {
            width = "33%"
          } else {
            width = "25%"
          }

          return (
            <React.Fragment>
              <Row>
                <Col>
                  <Flex flexWrap>
                    {this.props.artist.related.artists.edges.map(
                      ({ node }, index) => {
                        return (
                          <Box pr={1} pb={1} width={width} key={index}>
                            <ArtistCardFragmentContainer artist={node as any} />
                          </Box>
                        )
                      }
                    )}
                  </Flex>
                </Col>
              </Row>

              <Box py={2}>
                <Separator />
              </Box>

              <Row>
                <Col>
                  <Flex justifyContent="flex-end">
                    <PaginationFragmentContainer
                      pageCursors={
                        this.props.artist.related.artists.pageCursors as any
                      }
                      onClick={this.loadAfter}
                      onNext={this.loadNext}
                      scrollTo={this.props.scrollTo}
                    />
                  </Flex>
                </Col>
              </Row>
            </React.Fragment>
          )
        }}
      </Responsive>
    )
  }
}

export const RelatedArtistsRefetchContainer = createRefetchContainer(
  RelatedArtistsList,
  {
    artist: graphql`
      fragment RelatedArtistsList_artist on Artist
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 6 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          kind: { type: "RelatedArtistsKind" }
        ) {
        id
        related {
          artists(
            first: $first
            after: $after
            before: $before
            last: $last
            kind: $kind
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
            pageCursors {
              ...Pagination_pageCursors
            }
            edges {
              node {
                ...ArtistCard_artist
              }
            }
          }
        }
      }
    `,
  },
  graphql`
    query RelatedArtistsListQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $artistID: String!
      $kind: RelatedArtistsKind
    ) {
      artist(id: $artistID) {
        ...RelatedArtistsList_artist
          @arguments(
            kind: $kind
            first: $first
            last: $last
            after: $after
            before: $before
          )
      }
    }
  `
)