import React from 'react';
import { Stack, Icon, PrimaryButton, TextField, Separator } from '@fluentui/react';
import {
    paneFooterStyles,
    paneFooterTokens,
    footerMainTextStyle,
    textFieldStyles,
    copyLinkButtonStyle,
    copyIconStyle
} from './styles/CommandPanel.styles';

const invitePeopleString = 'Invite people to join the call';
const copyJoinInfoString = 'Copy join info';

const copyJoinLink = (): void => {
    const inputElement = document.getElementById('inputText') as HTMLInputElement;
    inputElement.select();
    document.execCommand('copy');
};

export interface FooterProps {
    groupId: string;
}

export default (props: FooterProps): JSX.Element => {
    return (
        <Stack styles={paneFooterStyles} tokens={paneFooterTokens}>
            <Separator />
            <div className={footerMainTextStyle}>{invitePeopleString}</div>
            <TextField styles={textFieldStyles} id="inputText" type="text" value={`${window.location.protocol}//${window.location.host}/?groupId=${props.groupId}`}></TextField>
            <PrimaryButton className={copyLinkButtonStyle} onClick={copyJoinLink}>
                <Icon iconName="Copy" className={copyIconStyle} />
                {copyJoinInfoString}
            </PrimaryButton>
        </Stack>
    );
};
