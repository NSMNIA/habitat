import React, { useContext, useState } from "react";

const PanoContext = React.createContext();
const UpdatePanoContext = React.createContext();

export const usePano = () => {
    return useContext(PanoContext);
};

export const useUpdatePano = () => {
    return useContext(UpdatePanoContext);
};

export const PanoProvider = ({ value, children }) => {
    const [pano, setPano] = useState(value);
    return (
        <PanoContext.Provider value={pano}>
            <UpdatePanoContext.Provider value={setPano}>
                {children}
            </UpdatePanoContext.Provider>
        </PanoContext.Provider>
    );
};