import { Serif } from "@artsy/palette"
import React, { SFC } from "react"
import { Col, Row } from "Styleguide/Elements/Grid"
import { Separator } from "Styleguide/Elements/Separator"
import { Spacer } from "Styleguide/Elements/Spacer"
import { Responsive } from "Utils/Responsive"

interface ArtistShowListItemProps {
  exhibitionInfo: string
  name: string
  partner: string
  city: string
  href: string
}

const FIXME_DOMAIN = "https://www.artsy.net"

export const ArtistShowListItem: SFC<ArtistShowListItemProps> = props => {
  return (
    <Responsive>
      {({ xs }) => {
        if (xs) return <SmallShowListItem {...props} />
        else return <LargeShowListItem {...props} />
      }}
    </Responsive>
  )
}

const LargeShowListItem: SFC<ArtistShowListItemProps> = props => {
  const { name, city, exhibitionInfo, href, partner } = props

  return (
    <React.Fragment>
      <Separator mb={4} />
      <Row>
        <Col sm={3}>
          <Serif size="2">
            {city && `${city}, `}
            {exhibitionInfo}
          </Serif>
        </Col>
        <Col sm={6}>
          <Serif size="4">
            <a href={FIXME_DOMAIN + href} className="noUnderline">
              {name}
            </a>
          </Serif>
          <Serif size="2" color="black60">
            <a href={FIXME_DOMAIN + href} className="noUnderline">
              {partner}
            </a>
          </Serif>
        </Col>
        <Col sm={3}>
          <Serif size="2">{city}</Serif>
        </Col>
      </Row>

      <Spacer mb={4} />
    </React.Fragment>
  )
}

const SmallShowListItem: SFC<ArtistShowListItemProps> = props => {
  const { name, city, exhibitionInfo, href, partner } = props

  return (
    <React.Fragment>
      <Separator mb={3} />
      <Serif size="3">
        <a href={FIXME_DOMAIN + href} className="noUnderline">
          {name}
        </a>
      </Serif>
      <Serif size="2" color="black60">
        <a href={FIXME_DOMAIN + props.href} className="noUnderline">
          {partner}
        </a>
      </Serif>
      <Serif size="1" color="black60">
        {city && `${city}, `}
        {exhibitionInfo}
      </Serif>
      <Spacer mb={3} />
    </React.Fragment>
  )
}
