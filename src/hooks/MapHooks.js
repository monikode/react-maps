import { useState } from "react";

function MapHooks(){
    const [markers, setMarkers] = useState([])
    const [coords, setCoords] = useState({})

    function changeCoords (x, y) {
        var coord = {
            x, y
        }
        setCoords(coord)
    }
    function addMarker(marker){
        setMarkers([...markers, marker])
    }

    return { markers, coords, addMarker, changeCoords}
}
export default MapHooks;