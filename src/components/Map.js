import * as React from "react";

const Map = () => {
const sourceURL = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk&q=vet+near+me";
  return (
    <div width="640px" height="640px">
    <iframe
				src="https://www.google.com/maps/embed/v1/search?key=AIzaSyBDUcFZdWRZ5SQOq_q4OYE3DoDhKMRcxgk&q=vet+near+me"
				width="640px"
				//sandbox="aasda"
				height="340px"
				id=""
				className=""
				sandbox="allow-scripts allow-same-origin"
				//sandbox={["allow-same-origin", "allow-scripts"]}
				//display="block"
				position="relative"
				allowFullScreen
			/>
      </div>
  )
}

export default Map;