import { resource, url } from '../../backend.js'


const fetchItem = (field) => (dispatch) => {
    resource('GET', field)
        .then(r => {
            dispatch({type: 'UPDATE_'+ field.toUpperCase() , field: r[field]})
        })
}

export const fetchProfile = () => (dispatch) => {
    fetchItem('email')(dispatch);
    fetchItem('zipcode')(dispatch);
    fetchItem('dob')(dispatch)

}
