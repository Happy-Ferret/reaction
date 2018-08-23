import { color, Sans, space } from "@artsy/palette"
import { PreloadLink, PreloadLinkProps } from "Artsy/Router"
import React from "react"
import styled from "styled-components"
import { Flex } from "Styleguide/Elements/Flex"
import { styles } from "./Tabs"

export const RouteTabs: any /* FIXME */ = styled(Flex)`
  ${styles.tabsContainer};

  ${(props: any) => {
    if (props.size === "xs") {
      return `
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll;
        overflow-y: hidden;
      `
    }
  }};

  a {
    ${styles.tabContainer};
    margin-right: ${space(3)}px;
    color: ${color("black30")};
    text-decoration: none;

    &.active {
      color: ${color("black100")};
      ${styles.activeTabContainer};
    }
  }
`

export const RouteTab: React.SFC<Partial<PreloadLinkProps>> = ({
  children,
  ...props
}) => {
  return (
    <PreloadLink {...props}>
      <Sans size="3t" weight="medium">
        {children}
      </Sans>
    </PreloadLink>
  )
}

RouteTabs.displayName = "RouteTabs"
RouteTab.displayName = "RouteTab"
