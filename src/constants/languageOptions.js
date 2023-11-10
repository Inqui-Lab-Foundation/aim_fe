export const languageOptions = [
    {
        code: 'en',
        name: 'English',
        country_code: 'in'
    },
    {
        code: 'tn',
        name: 'Tamil',
        country_code: 'in'
    },
    {
        code: 'hi',
        name: 'Hindi',
        country_code: 'in'
    },
    {
        code: 'te',
        name: 'Telugu',
        country_code: 'in'
    },
    {
        code: 'ka',
        name: 'Kannada',
        country_code: 'in'
    }

    // {
    //     code: process.env.REACT_APP_LOCAL_LANGUAGE_CODE,
    //     name: process.env.REACT_APP_LOCAL_LANGUAGE_NAME,
    //     country_code: 'in'
    // }
];

export const getLanguage = (lang) => {
    if (lang?.code == 'en' || lang?.code == '' || lang?.code == undefined) {
        return `locale=en`;
    } else if (lang?.code == 'hi') {
        return `locale=hi`;
    } else if (lang?.code == 'te') {
        return `locale=te`;
    } else if (lang?.code == 'ka') {
        return `locale=ka`;
    } else if (lang?.code == 'tn') {
        return `locale=tn`;
    } else {
        return `locale=en`;
    }
};
