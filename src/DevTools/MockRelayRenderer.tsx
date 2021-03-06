import { ContextProvider } from "Artsy"
import { LoadingClassName } from "Artsy/Relay/renderWithLoadProgress"
import { ContextConsumer } from "Artsy/SystemContext"
import { IMocks } from "graphql-tools/dist/Interfaces"
import React from "react"
import { QueryRenderer } from "react-relay"
import {
  Environment,
  GraphQLTaggedNode,
  RecordSource,
  Store,
} from "relay-runtime"
import { createMockNetworkLayer } from "./createMockNetworkLayer"

export interface MockRelayRendererProps {
  Component: React.ComponentType
  query: GraphQLTaggedNode
  mockResolvers: IMocks
}

/**
 * Renders a tree of Relay containers with a mocked local instance of the
 * metaphysics schema.
 *
 * @note
 * Use this component in storybooks, but not tests. Because Relay works
 * asynchronously _and_ a tree may contain nested `QueryRenderer` components,
 * for tests you should usually use {@link renderRelayTree}.
 *
 * @param params.Component
 * The component that either is a Relay container or has children that are Relay
 * containers.
 *
 * @param params.query
 * The root GraphQL query.
 *
 * @param params.mockResolvers
 * A list of types/fields, that are part of metaphysics’ schema, and the data to
 * return for those. See {@link https://www.apollographql.com/docs/graphql-tools/mocking.html#Customizing-mocks}
 *
 * @example
 *
   ```tsx
   jest.unmock("react-relay")

   const Artwork = createFragmentContainer(
     props => (
       <div>
         <span>{props.artwork.title}}</span>
         <img src={props.artwork.image.url} />
       </div>
     ),
     graphql`
       fragment MockRelayRenderer_artwork on Artwork {
         image {
           url
         }
       }
     `
   )

   it("renders a Relay tree", done => {
     const wrapper = mount(
       <MockRelayRenderer
         Component={Artwork}
         query={graphql`
           query MockRelayRendererQuery {
             artwork(id: "mona-lisa") {
               ...MockRelayRenderer_artwork
             }
           }
         `}
         mockResolvers={{
           Artwork: () => ({
             title: "Mona Lisa",
             image: {
               url: "http://test/image.jpg",
             },
           }),
         }}
       />
     )
     setTimeout(() => {
       expect(wrapper.find("span").text()).toEqual("Mona Lisa")
       expect(wrapper.find("img").props().src).toEqual("http://test/image.jpg")
       done()
     }, 10)
   })
   ```
 *
 */
export const MockRelayRenderer = ({
  Component,
  query,
  mockResolvers,
}: MockRelayRendererProps) => {
  if (
    typeof __webpack_require__ === "undefined" &&
    QueryRenderer === require("../../__mocks__/react-relay").QueryRenderer
  ) {
    throw new Error(
      "The `react-relay` module has been mocked, be sure to unmock it with: " +
        '`jest.unmock("react-relay")`'
    )
  }

  const network = createMockNetworkLayer({
    Query: () => ({}),
    ...mockResolvers,
  })
  const source = new RecordSource()
  const store = new Store(source)
  const environment = new Environment({
    network,
    store,
  })

  return (
    <ContextConsumer>
      {contextProps => (
        <ContextProvider {...contextProps} relayEnvironment={environment}>
          <QueryRenderer
            // tslint:disable-next-line relay-operation-generics
            query={query}
            environment={environment}
            variables={{}}
            render={({ error, props, retry }) => {
              if (props) {
                return <Component {...props} />
              } else if (error) {
                return <div className="relay-error">{error}</div>
              } else {
                return <div className={LoadingClassName}>Loading</div>
              }
            }}
          />
        </ContextProvider>
      )}
    </ContextConsumer>
  )
}
