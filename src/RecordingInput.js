import React, {useEffect, useState} from 'react';
import {Form, Header, Message, Segment, TextArea} from "semantic-ui-react";

const RecordingInput = ({ onJsonParsed }) => {
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, []);

    const handlePaste = (event) => {
        try {
            const pastedData = JSON.parse(event.target.value);
            setError('');
            onJsonParsed(pastedData);
        } catch (error) {
            setError("Invalid JSON: " + error.message);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const fileData = JSON.parse(event.target.result);
                setError('');
                onJsonParsed(fileData);
            } catch (error) {
                setError("Invalid JSON: " + error.message);
            }
        };

        reader.readAsText(file);
    };

    return <React.Fragment>
        <Header as='h2' color='teal' textAlign='center'>
            Burp Suite Recording Viewer
        </Header>
        <Form size='large' error={error.length > 0}>
            <Segment stacked>
                <Form.Field>

                    <TextArea placeholder='Paste or drag-and-drop your recording JSON here.'
                              onChange={handlePaste}
                              rows={10}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}/>
                    <Message error header="Error" content={error} />
                </Form.Field>
            </Segment>
        </Form>
    </React.Fragment>
}

export default RecordingInput;