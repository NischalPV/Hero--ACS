import { loadTheme, initializeIcons } from '@fluentui/react';
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import GroupCall from './containers/GroupCall';
import EndCall from './components/EndCall';
import ChatScreen from './containers/ChatScreen';
import ConfigurationScreen from './containers/ConfigurationScreen';
import CallConfigurationScreen from './containers/Configuration';
import EndScreen from './components/EndScreen';
import RemovedFromThreadScreen from './components/RemovedFromThreadScreen';
import HomeScreen from './containers/HomeScreen';
import { reducer } from './core/reducers/index';
import { getBuildTime, getChatSDKVersion, getThreadId, getGroupIdFromUrl } from './utils/utils';
import { CallEndReason } from '@azure/communication-calling';
import { v1 as createGUID } from 'uuid';
import { Route } from 'react-router';

console.info(`Azure Communication Services chat sample using @azure/communication-chat : ${getChatSDKVersion()}`);
console.info(`Build Date : ${getBuildTime()}`);

loadTheme({});
initializeIcons();

const store = createStore(reducer, applyMiddleware(thunk));

export default (): JSX.Element => {

    const [page, setPage] = useState('home');
    const [callEndReason, setCallEndReason] = useState<CallEndReason | undefined>();
    const [groupId, setGroupId] = useState('');
    const [screenWidth, setScreenWidth] = useState(0);
    const [localVideoStream, setLocalVideoStream] = useState(undefined);

    useEffect(() => {
        const setWindowWidth = (): void => {
            const width = typeof window !== 'undefined' ? window.innerWidth : 0;
            setScreenWidth(width);
        };
        setWindowWidth();
        window.addEventListener('resize', setWindowWidth);
        return (): void => window.removeEventListener('resize', setWindowWidth);
    }, []);

    const getGroupId = (): string => {
        if (groupId) return groupId;
        const uriGid = getGroupIdFromUrl();
        const gid = uriGid == null || uriGid === '' ? createGUID() : uriGid;
        setGroupId(gid);
        return gid;
    };

    //<Route path='/' component={() => {
        const getComponent = () => {
            if (page === 'home') {
                return <HomeScreen />;
            }
            else if (page === 'configuration') {
                return <ConfigurationScreen joinChatHandler={() => setPage('chat')} />;
            }
            else if (page === 'chat') {
                return (
                    <ChatScreen
                        removedFromThreadHandler={() => setPage('removedFromThread')}
                        leaveChatHandler={() => setPage('end')}
                        startCallHandler={(): void => {
                            window.history.pushState({}, document.title, window.location.href + '?groupId=' + getGroupId());
                            window.open(window.location.href+ '?groupId=' + getGroupId(), '_blank');

                            setPage('callConfiguration');
                        }}
                    />
                );
            }
            else if (page === 'callConfiguration') {
                return (
                    <CallConfigurationScreen
                        startCallHandler={(): void => setPage('call')}
                        unsupportedStateHandler={(): void => setPage('unsupported')}
                        callEndedHandler={(errorMsg: CallEndReason): void => {
                            setCallEndReason(errorMsg);
                            setPage('error');
                        }}
                        groupId={getGroupId()}
                        screenWidth={screenWidth}
                        localVideoStream={localVideoStream}
                        setLocalVideoStream={setLocalVideoStream}
                    />
                );
            }
            else if (page === 'call') {
                return (
                    <GroupCall
                        endCallHandler={(): void => setPage('endCall')}
                        groupId={getGroupId()}
                        screenWidth={screenWidth}
                        localVideoStream={localVideoStream}
                        setLocalVideoStream={setLocalVideoStream}
                    />
                );
            }
            else if (page === 'endCall') {
                return (
                    <EndCall
                        message={'You left the call'}
                        rejoinHandler={(): void => {
                            window.location.reload();
                        }}
                        homeHandler={(): void => {
                            window.location.href = window.location.href.split('?')[0];
                        }}
                    />
                );
            }
            else if (page === 'end') {
                return (
                    <EndScreen
                        rejoinHandler={() => {
                            window.location.href = window.location.href;
                        }}
                        homeHandler={() => (window.location.href = window.location.origin)}
                    />
                );
            }
            else if (page === 'removedFromThread') {
                return <RemovedFromThreadScreen homeHandler={() => (window.location.href = window.location.origin)} />;
            }
        };

    //}} />
    if (getThreadId() && page === 'home') {
        setPage('configuration');
    }

    return <Provider store={store}>{getComponent()}</Provider>;
};
