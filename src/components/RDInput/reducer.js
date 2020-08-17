const _classes = {
    rdWrap: ['rd-input-wrap'],
    inputContent: ['rd-input-content'],
    contentLabel: ['rd-content-label'],
    contentLabelWrap: ['rd-content-label-wrap'],
    content: ['rd-content'],
    clickable: ['rd-clickable'],
    label: ['rd-label'],
    labelWrap: ['rd-label-wrap'],
    labelErr: [],
    labelValid: [],
    hint: ['rd-hint'],
    hintP: ['rd-hint-p'],
    input: ['rd-input'],
    spinner: ['rd-spinner'],
    question: ['rd-question'],
}

export const types = {
    set: 'set',
    showInput: 'showInput',
    spinner: 'spinner',
    validationResult: 'validationResult',
    resetClasses: 'resetClasses',
    validate: 'validate',
};


export const state = {

    type: '', // *
    id: '',  // *
    name: '', // *
    label: '', // *

    hint: '',
    required: null,
    clickable: false,
    btn: null,
    question: '',

    _classes,

    // allways returns true if validator isn't provided
    valid: null,
    err: '',
    validator: null,

    showInput: false,
    spinner: false,
};

export function reducer(state, action) {
    switch (action.type) {
        case types.set:
            return {
                ...state,
                ...action.payload
            }
        case types.resetClasses:
            return {
                ...state,
                _classes: _classes,
            }
        // case types.validationResult:
        //     const [valid, err] = action.payload;
        //     const classToAdd = valid ?
        //         'rd-valid' : 'rd-error';
        //     const _toSet = {
        //         ...state,
        //         _classes: {
        //             ...state._classes,
        //             rdWrap: [..._classes.rdWrap, classToAdd]
        //         },
        //         valid,
        //         err,
        //     }
        //     return _toSet;
        case types.showInput:
            // showInput -> true = open input
            // showInput -> false = close input
            const close = !action.payload;

            // if askig to close input
            // and show clickable...
            if (close) {
                // ...check to see if input is valid
                const { valid } = state;
                // showInput is always opposite to valid
                const showInput = !valid;
                return {
                    ...state,
                    showInput,
                }
            }
            // otherwise open input
            return {
                ...state,
                showInput: action.payload,
            }
        case types.spinner:
            return {
                ...state,
                spinner: action.payload,
            }

        case types.validate:
            if (state.validator) {

                const [valid, err] =
                    state.validator(action.payload);

                const classToAdd = valid ?
                    'rd-valid' : 'rd-error';
                const showInput = !valid;
                const _toSet = {
                    ...state,
                    _classes: {
                        ...state._classes,
                        rdWrap: [..._classes.rdWrap, classToAdd]
                    },
                    valid,
                    err,
                    showInput,
                }
                return _toSet;
            }
            return {
                ...state,
            }
        default:
            throw Error(`Reducer error: shoudn't have happend`)
    }
}