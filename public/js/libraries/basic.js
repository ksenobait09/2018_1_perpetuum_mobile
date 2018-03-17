'use strict';

function reduceWithValues(fromArray, keyArray) {
    keyArray.reduce((allFields, fieldName) => {
        allFields[fieldName] = allFields[fieldName].value;
        return allFields;
    }, {});
}

function isQuerySelector(querySelector) {
    const elem = document.querySelector(querySelector);
    if (elem === undefined) {
        throw Error("no element found by query selector" + querySelector);
    }
    return elem;
}

function isEmail(email) {
    const  EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_PATTERN.test(email);
}

function validateLength(value) {
    const ALLOW_INPUT_LENGTH = 4;
    return (ALLOW_INPUT_LENGTH > value.length) && (value.length > 0);
}