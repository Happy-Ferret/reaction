import { Sans } from "@artsy/palette"
import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"
import { Arrow } from "Styleguide/Elements/Arrow"
import { Flex } from "Styleguide/Elements/Flex"
import { Separator } from "Styleguide/Elements/Separator"

export interface ToggleProps {
  disabled?: boolean
  expanded?: boolean
  label?: string
}

export interface ToggleState {
  disabled: boolean
  expanded: boolean
}

export class Toggle extends React.Component<ToggleProps> {
  state = {
    expanded: false,
    disabled: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      ...props,
    }
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { disabled, expanded } = this.state

    return (
      <Flex width="100%" flexDirection="column">
        <Separator mb={2} />
        {/* mt is for corrective spacing */}
        <Header mt="-6px" onClick={this.toggleExpand} disabled={disabled}>
          <Flex justifyContent="space-between">
            <Sans size="2" weight="medium" color="black100" mt={0.3}>
              {this.props.label}
            </Sans>
            {!disabled && (
              <Flex justifyContent="right">
                <Arrow direction={expanded ? "up" : "down"} />
              </Flex>
            )}
          </Flex>
        </Header>
        {expanded && (
          <Flex flexDirection="column" alignItems="left" mt={-1} mb={1}>
            {this.props.children}
          </Flex>
        )}
      </Flex>
    )
  }
}

interface HeaderProps extends ToggleProps, SpaceProps {}
const Header = styled.div.attrs<HeaderProps>({})`
  cursor: pointer;
  padding-bottom: 16px;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  user-select: none;
  ${space};
`
