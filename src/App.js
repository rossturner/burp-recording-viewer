import React, {useState} from 'react';
import {Grid} from "semantic-ui-react";
import RecordingInput from "./RecordingInput";
import RecordingView from "./RecordingView";

function App() {
    const [showInput, setShowInput] = useState(true);
    const [jsonData, setJsonData] = useState(undefined);

    const onJsonParsed = (jsonData) => {
        setShowInput(false);
        setJsonData(jsonData);
    }

    const clear = () => {
        setShowInput(true);
        setJsonData(undefined);
    }

    return (
        <Grid textAlign='left' style={{"padding": "30px"}}>
            <Grid.Column style={{maxWidth: '80%', minWidth: '400'}}>
                {showInput && <RecordingInput onJsonParsed={onJsonParsed} />}
                {!showInput && <RecordingView jsonData={jsonData} onReset={clear} />}
            </Grid.Column>
        </Grid>
    );
}

export default App;
