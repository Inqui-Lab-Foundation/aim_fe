import axios from 'axios';

import { GET_MYTEAM, GET_MYTEAM_SUCCESS, GET_MYTEAM_ERROR } from '../actions';
import { URL, KEY } from '../../constants/defaultValues';
import { getNormalHeaders } from '../../helpers/Utils';
import { encryptGlobal } from '../../constants/encryptDecrypt';

export const getTeamSuccess = (team) => async (dispatch) => {
    dispatch({
        type: GET_MYTEAM_SUCCESS,
        payload: team
    });
};

export const getTeamError = (message) => async (dispatch) => {
    dispatch({
        type: GET_MYTEAM_ERROR,
        payload: { message }
    });
};

export const getTeamData = (teamId) => async (dispatch) => {
    try {
        dispatch({ type: GET_MYTEAM });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const teamParam = encryptGlobal(JSON.stringify(teamId));
        const result = await axios
            .get(`${URL.getTeamMembersList}${teamParam}/members`, axiosConfig)
            .then((team) => team)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data && result.data?.data && result.data?.data;
            dispatch(getTeamSuccess(data));
        } else {
            dispatch(getTeamError(result.statusText));
        }
    } catch (error) {
        dispatch(getTeamError({}));
    }
};
