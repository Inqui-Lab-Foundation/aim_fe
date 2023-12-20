/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios';

import {
    ADMIN_COURSES_LIST,
    ADMIN_COURSES_LIST_SUCCESS,
    ADMIN_COURSES_LIST_ERROR,
    ADMIN_COURSES_DETAILS,
    ADMIN_COURSES_DETAILS_SUCCESS,
    ADMIN_COURSES_DETAILS_ERROR,
    ADMIN_COURSES_QUESTIONS,
    ADMIN_COURSES_QUESTIONS_SUCCESS,
    ADMIN_COURSES_QUESTIONS_ERROR,
    ADMIN_COURSES_QUESTIONS_RESPONCE,
    ADMIN_COURSES_QUESTIONS_RESPONCE_SUCCESS,
    ADMIN_COURSES_QUESTIONS_RESPONCE_ERROR,
    ADMIN_COURSES_REF_QUESTIONS,
    ADMIN_COURSES_REF_QUESTIONS_SUCCESS,
    ADMIN_COURSES_REF_QUESTIONS_ERROR,
    ADMIN_COURSES_REF_QUESTIONS_RESPONCE,
    ADMIN_COURSES_REF_QUESTIONS_RESPONCE_SUCCESS,
    ADMIN_COURSES_REF_QUESTIONS_RESPONCE_ERROR,
    ADMIN_COURSES_CREATE,
    ADMIN_COURSES_CREATE_SUCCESS,
    ADMIN_COURSES_CREATE_ERROR
} from '../../../../redux/actions.js';
import { URL, KEY } from '../../../../constants/defaultValues.js';
import { getNormalHeaders } from '../../../../helpers/Utils.js';
import { getLanguage } from '../../../../constants/languageOptions.js';
import { encryptGlobal } from '../../../../constants/encryptDecrypt.js';

export const getAdminCorsesListSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_LIST_SUCCESS,
        payload: user
    });
};

export const getAdminCoursesListError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_LIST_ERROR,
        payload: { message }
    });
};

export const getAdminCoursesList = (lang) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_COURSES_LIST });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(`${URL.getAdminCouses}?${getLanguage(lang)}`, axiosConfig)
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data;
            dispatch(getAdminCorsesListSuccess(data));
        } else {
            dispatch(getAdminCoursesListError(result.statusText));
        }
    } catch (error) {
        dispatch(getAdminCoursesListError({}));
    }
};

export const adminCoursesCreateSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_CREATE_SUCCESS,
        payload: user
    });
};

export const adminCoursesCreateError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_CREATE_ERROR,
        payload: { message }
    });
};

export const adminCoursesCreate = (data, history, lang) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_COURSES_CREATE });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .post(
                `${URL.addAdminCourses}?${getLanguage(lang)}`,
                data,
                axiosConfig
            )
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });

        if (result && result.status === 201) {
            dispatch(adminCoursesCreateSuccess('Course Successfully Create'));
            setTimeout(() => {
                history.push('/admin/playvideo');
                dispatch(adminCoursesCreateSuccess(''));
            }, 1000);
        } else {
            dispatch(adminCoursesCreateError(result.statusText));
        }
    } catch (error) {
        dispatch(adminCoursesCreateError({}));
    }
};

export const getAdminCourseDetailsSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_DETAILS_SUCCESS,
        payload: user
    });
};

export const getAdminCourseDetailsError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_DETAILS_ERROR,
        payload: { message }
    });
};

export const getAdminCourseDetails = (courseId, lang) => async (dispatch) => {
    // here courseId = courseId //

    try {
        dispatch({ type: ADMIN_COURSES_DETAILS });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const couId = encryptGlobal(JSON.stringify(courseId));
        const getLang = getLanguage(lang);
        const resLang = encryptGlobal(JSON.stringify(getLang));
        const result = await axios
            .get(
                `${URL.getAdminCousesDetails + couId}?Data=${resLang}`,
                axiosConfig
            )
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result.data;
            dispatch(getAdminCourseDetailsSuccess(data));
        } else {
            dispatch(getAdminCourseDetailsError(result.statusText));
        }
    } catch (error) {
        dispatch(getAdminCourseDetailsError({}));
    }
};

export const getAdminQuizQuestionsSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_QUESTIONS_SUCCESS,
        payload: user
    });
};

export const getAdminQuizQuestionsError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_QUESTIONS_ERROR,
        payload: { message }
    });
};

export const getAdminQuizQuestions =
    (quizId, lang, attempt) => async (dispatch) => {
        // here quizId = quizId //
        try {
            dispatch({ type: ADMIN_COURSES_QUESTIONS });
            const quizParam = encryptGlobal(JSON.stringify(quizId));
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const quizLang = getLanguage(lang);
            const resGet = encryptGlobal(JSON.stringify(quizLang));
            const att = attempt;
            const attRes = encryptGlobal(JSON.stringify(att));
            const result = await axios
                .get(
                    `${
                        URL.getAdminQstList + quizParam + '/' + 'nextQuestion'
                    }?${resGet}&attempts=${attRes}`,
                    axiosConfig
                )
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data = result;
                dispatch(getAdminQuizQuestionsSuccess(data));
                dispatch(getAdminQuizResponceSuccess({}));
            } else {
                dispatch(getAdminQuizQuestionsError(result.statusText));
                dispatch(getAdminQuizResponceSuccess({}));
            }
        } catch (error) {
            dispatch(getAdminQuizQuestionsError({}));
            dispatch(getAdminQuizResponceSuccess({}));
        }
    };

export const getAdminQuizResponceSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_QUESTIONS_RESPONCE_SUCCESS,
        payload: user
    });
};

export const getAdminQuizResponceError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_QUESTIONS_RESPONCE_ERROR,
        payload: { message }
    });
};

export const getAdminQuizResponce =
    (quizId, body, lang) => async (dispatch) => {
        try {
            dispatch({ type: ADMIN_COURSES_QUESTIONS_RESPONCE });
            const resId = encryptGlobal(JSON.stringify(quizId));
            const Lngparam = getLanguage(lang);

            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .post(
                    `${
                        URL.putAdminQuizResponce + resId + '/' + 'response'
                    }?Data=${Lngparam}`,
                    body,
                    axiosConfig
                )
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data = result;
                dispatch(getAdminQuizResponceSuccess(data));
            } else {
                dispatch(getAdminQuizResponceError(result.statusText));
            }
        } catch (error) {
            dispatch(getAdminQuizResponceError({}));
        }
    };

export const getAdminRfQuizResponceSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_REF_QUESTIONS_RESPONCE_SUCCESS,
        payload: user
    });
};

export const getAdminRfQuizResponceError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_REF_QUESTIONS_RESPONCE_ERROR,
        payload: { message }
    });
};

export const getAdminRfQuizResponce =
    (quizId, body, lang) => async (dispatch) => {
        try {
            dispatch({ type: ADMIN_COURSES_REF_QUESTIONS_RESPONCE });
            const axiosConfig = getNormalHeaders(KEY.User_API_Key);
            const result = await axios
                .post(
                    `${
                        URL.postAdminRefQuizResponce + quizId + '/' + 'response'
                    }?${getLanguage(lang)}`,
                    body,
                    axiosConfig
                )
                .then((user) => user)
                .catch((err) => {
                    return err.response;
                });
            if (result && result.status === 200) {
                const data = result;
                dispatch(getAdminRfQuizResponceSuccess(data));
            } else {
                dispatch(getAdminRfQuizResponceError(result.statusText));
            }
        } catch (error) {
            dispatch(getAdminRfQuizResponceError({}));
        }
    };

export const getAdminRefQuizQstSuccess = (user) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_REF_QUESTIONS_SUCCESS,
        payload: user
    });
};

export const getAdminRefQuizQstError = (message) => async (dispatch) => {
    dispatch({
        type: ADMIN_COURSES_REF_QUESTIONS_ERROR,
        payload: { message }
    });
};

export const getAdminRefQuizQst = (refQizId, lang) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_COURSES_REF_QUESTIONS });
        const axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const result = await axios
            .get(
                `${
                    URL.getAdminRefQizList + refQizId + '/' + 'nextQuestion'
                }?${getLanguage(lang)}`,
                axiosConfig
            )
            .then((user) => user)
            .catch((err) => {
                return err.response;
            });
        if (result && result.status === 200) {
            const data = result;
            dispatch(getAdminRfQuizResponceSuccess({}));
            dispatch(getAdminRefQuizQstSuccess(data));
        } else {
            dispatch(getAdminRfQuizResponceSuccess({}));
            dispatch(getAdminRefQuizQstError(result.statusText));
        }
    } catch (error) {
        dispatch(getAdminRefQuizQstError({}));
        dispatch(getAdminRfQuizResponceSuccess({}));
    }
};
