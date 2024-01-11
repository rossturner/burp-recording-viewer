import React from 'react';
import {Icon, Step, StepContent, StepDescription, StepTitle} from "semantic-ui-react";

const RecordingStep = ({stepJson}) => {
    let unsupported = false;
    const elementDescription = (elementJson, isWithinShadowDom) => {
        let description = '<' + elementJson['tagName'].toLowerCase();

        if (elementJson['id']) {
            description += ' id="'+elementJson['id']+'">';
        } else if (elementJson['href']) {
            description += ' href="'+elementJson['href']+'">';
        } else if (elementJson['name']) {
            description += ' name="'+elementJson['name']+'">';
        } else if (elementJson['xpath'] && !isWithinShadowDom) {
            description += '> with xpath ' + elementJson['xpath'];
        } else if (elementJson['textContent'] && !isWithinShadowDom) {
            description += '>' + elementJson['textContent'] + '</' + elementJson['tagName'].toLowerCase() + '>';
        } else if (elementJson['className']) {
            description += ' class="'+elementJson['className']+'">';
        } else {
            description = 'This element selector is not supported.'
            unsupported = true;
        }

        if (elementJson['isShadowElement']) {
            description += ' within shadow DOM parent ' + elementDescription(elementJson['shadowParent'], false);
        }

        return description;
    }

    const millisDescription = (millis) => {
        if (millis < 1000) {
            return 'For ' + millis + 'ms';
        } else {
            return 'For ' + (millis / 1000) + ' second(s)';
        }
    }

    const type = stepJson['eventType'];

    let icon = 'question';
    let title = 'Unknown event type';
    let description = '';
    switch (type) {
        case 'goto':
        case 'userNavigate':
            icon = 'globe';
            title = 'Navigate to '
            description = <a href={stepJson['url']} target='_blank' rel="noreferrer">{stepJson['url']}</a>;
            break;
        case 'clientSideRedirect':
            icon = 'globe';
            title = 'Follow redirection to';
            description = <a href={stepJson['url']} target='_blank' rel="noreferrer">{stepJson['url']}</a>;
        break;
        case 'click':
            icon = 'mouse pointer';
            title = 'Click on';
            description = elementDescription(stepJson, stepJson['isShadowElement']);
            break;
        case 'rightClick':
            icon = 'mouse pointer';
            title = 'Right-click on';
            description = elementDescription(stepJson, stepJson['isShadowElement']);
            break;
        case 'typing':
            icon = 'keyboard';
            title = 'Type into ' + elementDescription(stepJson, stepJson['isShadowElement']);
            description = stepJson['typedValue'];
            break;
        case 'wait':
            icon = 'hourglass';
            title = 'Wait';
            description = millisDescription(stepJson['durationInMillis']);
            break;
        case 'scroll':
            icon = 'arrows alternate vertical';
            title = 'Scroll mousewheel';
            description = 'This is ignored in Burp playback';
            break;
        case 'keyboard':
            icon = 'keyboard';
            title = 'Press key on keyboard';
            description = stepJson['key'];
            break;
        default:
            console.error('Unrecognised event type: ', JSON.stringify(stepJson));
    }


    return <Step active={!unsupported}>
        <Icon name={icon} />
        <StepContent>
            <StepTitle>{title}</StepTitle>
            <StepDescription>{description}</StepDescription>
        </StepContent>
    </Step>
}

export default RecordingStep;