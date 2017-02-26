export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const ERROR = 'ERROR'
export const ROUTE_TO = 'ROUTE_TO'

export const validateText = (field, text, pattern) => {
    if (text.match(pattern)) {
        return { type: UPDATE_ACCOUNT, text, field}
    }
    return { type: ERROR, message: 'Text must be longer than 5 characters'}
}
