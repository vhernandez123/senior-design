//https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-25-adding-google-maps-autocomplete-search-to-a-react-app-8d238aa07288
export const SearchErrorMessage = ({status}) => {
    return status === '' || status === 'OK' ? null : (
      <div role="alert">
        {
        status === 'ZERO_RESULTS' || status === 'INVALID_REQUEST' || status === 'NOT_FOUND' ? (
            <p>
              No place is found on the map. Try another search term.
            </p>
        ) : status === 'OVER_QUERY_LIMIT' || status === 'REQUEST_DENIED' ? (
            <p>
                Pet Logger is currently unable to use Google Maps search. Please contact us so we can fix the problem.
            </p>//changed the title of the application in the error message
        ) : (
            <p>
              Google Maps server is down. <a href="https://status.cloud.google.com/maps-platform/products/i3CZYPyLB1zevsm2AV6M/history" target="_blank" rel="noreferrer">Please check its status</a>, and try again once they fix the problem (usually within a few hours).
            </p>
            )
        }
      </div>
    )
  }