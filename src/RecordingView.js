import React from 'react';
import RecordingStep from "./RecordingStep";
import {Button, Icon, Step, StepContent, StepGroup, StepTitle} from "semantic-ui-react";


const RecordingView = ({jsonData, onReset}) => {

    const jsonSteps = jsonData.slice(1);
    const version = jsonData[0]['version'];
    const recordingDate = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Set to true if you prefer 12-hour format (AM/PM)
    }).format(new Date(jsonData[1]['date']));
    const steps = jsonSteps.map(stepJson => <RecordingStep stepJson={stepJson} />);

    return <React.Fragment>

        <div>
            <p>Recorder version: {version}</p>
            <p>Recorded on {recordingDate}</p>
            <Button onClick={onReset}>Reset</Button>
        </div>


        <StepGroup vertical>

            {steps}

            <Step completed>
                <Icon name='info'/>
                <StepContent>
                    <StepTitle>Recorded login complete</StepTitle>
                </StepContent>
            </Step>
        </StepGroup>
    </React.Fragment>;
}

export default RecordingView;