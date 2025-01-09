import React from 'react'
import location from '../assets/images/location.png'


function LocationSearchPanel({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) {


    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    return (
        <div className="h-full overflow-y-scroll p-2 mt-5">
        {suggestions.map((element, index) => (
          <div
            key={index}
            onClick={() => handleSuggestionClick(element)}
            className="flex border-2 p-3 rounded-md items-center justify-start mb-4 gap-2"
          >
            <img className="bg-[#eeee] p-2 rounded-full" src={location} alt="" />
            <h4 className="font-medium">{element}</h4>
          </div>
        ))}
      </div>
    )
}

export default LocationSearchPanel