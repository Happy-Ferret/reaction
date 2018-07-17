import { Serif } from "@artsy/palette"
import { ArtistHeader_artist } from "__generated__/ArtistHeader_artist.graphql"
import FollowArtistButton from "Components/FollowButton/FollowArtistButton"
import React, { SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AppState } from "Router/state"
import { Slider } from "Styleguide/Components/Slider"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Subscribe } from "unstated"
import { Responsive } from "Utils/Responsive"

interface Props {
  artist: ArtistHeader_artist
  currentUser?: User
  mediator?: {
    trigger: (action: string, config: object) => void
  }
}

export const ArtistHeader: SFC<Props> = props => {
  return (
    <Subscribe to={[AppState]}>
      {({ state }) => {
        const {
          mediator,
          system: { currentUser },
        } = state

        return (
          <Responsive>
            {({ xs }) => {
              if (xs) {
                return (
                  <SmallArtistHeader
                    mediator={mediator}
                    currentUser={currentUser}
                    {...props}
                  />
                )
              } else {
                return (
                  <LargeArtistHeader
                    mediator={mediator}
                    currentUser={currentUser}
                    {...props}
                  />
                )
              }
            }}
          </Responsive>
        )
      }}
    </Subscribe>
  )
}

export const LargeArtistHeader: SFC<Props> = props => {
  const {
    artist: { carousel },
    currentUser,
  } = props

  return (
    <Box width="100%">
      <Slider
        height={200}
        data={carousel.images as any}
        render={slide => {
          return (
            <a href={slide.href}>
              <Image
                px={5}
                src={slide.resized.url}
                width={slide.resized.width}
                height={slide.resized.height}
              />
            </a>
          )
        }}
      />
      <Spacer my={2} />

      <Flex justifyContent="space-between">
        <Box>
          <Serif size="10">{props.artist.name}</Serif>
          <Flex>
            <Serif size="3">
              {props.artist.nationality && `${props.artist.nationality}, `}
              {props.artist.years}
            </Serif>
            <Spacer mr={2} />
            {props.artist.counts.follows > 50 && (
              <Serif size="3">
                {props.artist.counts.follows.toLocaleString()} followers
              </Serif>
            )}
          </Flex>
        </Box>
        <FollowArtistButton
          useDeprecatedButtonStyle={false}
          artist={props.artist as any}
          currentUser={currentUser}
          onOpenAuthModal={() => {
            props.mediator.trigger("open:auth", {
              mode: "signup",
              copy: `Sign up to follow ${props.artist.name}`,
              signupIntent: "follow artist",
              afterSignUpAction: {
                kind: "artist",
                action: "follow",
                objectId: props.artist.id,
              },
            })
          }}
        >
          Follow
        </FollowArtistButton>
      </Flex>
    </Box>
  )
}

export const SmallArtistHeader: SFC<Props> = props => {
  const {
    artist: { carousel },
    currentUser,
  } = props

  return (
    <Flex flexDirection="column">
      <Slider
        data={carousel.images as any}
        render={slide => {
          return (
            <a href={slide.href}>
              <Image
                px={5}
                src={slide.resized.url}
                width={slide.resized.width}
                height={slide.resized.height}
              />
            </a>
          )
        }}
      />
      <Spacer my={2} />

      <Flex flexDirection="column" alignItems="center">
        <Serif size="5">{props.artist.name}</Serif>
        <Flex>
          <Box mx={1}>
            <Serif size="2">
              {props.artist.nationality && `${props.artist.nationality}, `}
              {props.artist.years}
            </Serif>
          </Box>
          {props.artist.counts.follows > 50 && (
            <Serif size="2">
              {props.artist.counts.follows.toLocaleString()} followers
            </Serif>
          )}
        </Flex>
      </Flex>
      <Box my={2}>
        <FollowArtistButton
          artist={props.artist as any}
          useDeprecatedButtonStyle={false}
          buttonProps={{
            width: "100%",
          }}
          currentUser={currentUser}
          onOpenAuthModal={() => {
            props.mediator.trigger("open:auth", {
              mode: "signup",
              copy: `Sign up to follow ${props.artist.name}`,
              signupIntent: "follow artist",
              afterSignUpAction: {
                kind: "artist",
                action: "follow",
                objectId: props.artist.id,
              },
            })
          }}
        >
          Follow
        </FollowArtistButton>
      </Box>
    </Flex>
  )
}

export const ArtistHeaderFragmentContainer = createFragmentContainer(
  ArtistHeader,
  graphql`
    fragment ArtistHeader_artist on Artist {
      name
      id
      nationality
      years
      counts {
        follows
      }
      carousel {
        images {
          href
          resized(height: 300) {
            url
            width
            height
          }
        }
      }
      ...FollowArtistButton_artist
    }
  `
)
