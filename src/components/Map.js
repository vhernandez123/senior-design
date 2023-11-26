import * as React from "react";

const Map = () => {
  const sourceURL =
    "https://www.google.com/maps/embed/v1/search?key=AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk&q=vet+near+me";
  return (
    <div >
    <iframe
				src={sourceURL}
				width="100%"
				//sandbox="aasda"
				height="400"
				//sandbox={["allow-same-origin", "allow-scripts"]}
				//display="block"
				position="relative"
				allowFullScreen
			/>
      </div>
  )
}

export default Map;
