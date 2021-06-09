import { wait } from '@testing-library/react';
import { connect } from 'react-redux';

import ConfigurationScreen from '../components/ConfigurationScreen';
import { addUserToThread, isValidThread, userExists, setGlobalChatClient } from '../core/sideEffects';
import { getThreadId } from '../utils/utils';

//const mapDispatchToProps = (dispatch: any) => ({
//    setup: async () => {
//        dispatch(addUserToThread('LUIS', emoji));
//    },
//    isValidThread: async (threadId: string) => dispatch(isValidThread(threadId))
//});

const mapDispatchToProps = (dispatch: any) => ({

    setup: async (displayName: string, emoji: string) => {
        dispatch(setGlobalChatClient());
        let threadId = getThreadId();
        const luisExists = await userExists('LUIS', threadId);
        console.log('luisExists', luisExists);
        if (!luisExists) {
            dispatch(addUserToThread('LUIS', '🤖'));
        }

        dispatch(addUserToThread(displayName, emoji));

    },
    isValidThread: async (threadId: string) => dispatch(isValidThread(threadId))
});

export default connect(undefined, mapDispatchToProps)(ConfigurationScreen);
