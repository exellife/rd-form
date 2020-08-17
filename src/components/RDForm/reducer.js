export const types = {
    addClass: 'addClass',
}

export const classes = {
    form: [],
    inputWrap: [],
    inputContent: [],
    contentLabel: [],
    content: [],
    clickable: [],
    label: [],
    labelErr: [],
    labelValid: [],
    hint: [],
    input: [],
}

/**
 * 
 * @param {{}} state 
 * @param {{type: string, payload: String}} action 
 */
export function reducer(state, action) {
    switch(action.type) {

        default:
            throw Error('RDForm Reducer Error')
    }
}