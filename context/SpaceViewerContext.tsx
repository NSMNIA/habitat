import React, { useContext, useState } from "react";

const SpaceViewerContext = React.createContext({});
const UpdateSpaceViewerContext = React.createContext({});

const useSpaceViewer = () => {
    return useContext(SpaceViewerContext);
};

const useUpdateSpaceViewer = () => {
    return useContext(UpdateSpaceViewerContext);
};

const SpaceViewerProvider = ({ value, children }: any) => {
    const [spaceViewer, setSpaceViewer] = useState(value);
    return (
        <SpaceViewerContext.Provider value={spaceViewer}>
            <UpdateSpaceViewerContext.Provider value={setSpaceViewer}>
                {children}
            </UpdateSpaceViewerContext.Provider>
        </SpaceViewerContext.Provider>
    );
};

export {
    SpaceViewerProvider,
    useSpaceViewer,
    useUpdateSpaceViewer
};

