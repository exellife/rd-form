import React, { useState, useEffect, useReducer } from 'react';
import { reducer, state, types } from './reducer';

export function useRDInput() {

    const [_value, _setValue] = useState('');
    const [_state, dispatch] = useReducer(reducer, state)


    let timeout;
    useEffect(() => {
        timeout = setTimeout(() => {
            _validate(false);
        }, 700);

        return () => {
            clearTimeout(timeout);
        }
    }, [_value]);

    let timeout2;
    useEffect(() => {
        timeout2 = setTimeout(() => {
            const { valid } = _getState();
            if (valid) {
                dispatch({
                    type: types.showInput,
                    payload: false,
                })
            }
        }, 4000)

        return () => {
            clearTimeout(timeout2)
        }
    }, [_state.showInput, _value])

    function set(conf) {

        if (!conf.type || !conf.id
            || !conf.name || !conf.label) {
            throw Error(`type, id, name or label wasn't provided... make sure to pass type, unique id, unique name and label to every RDInput`);
        }
        if (conf.value) _setValue(conf.value);

        const [valid, required] = conf.validator ?
            [false, true] : [true, null];

        const showInput = valid === false;

        dispatch({
            type: types.set,
            payload: { ...conf, valid, required, showInput }
        });

        dispatch({
            type: types.validate,
            payload: { value: conf.value, close: true },
        })
    }

    function penclick(e) {
        e.preventDefault();
        dispatch({
            type: types.showInput,
            payload: true,
        })
    }

    function _spinner(bool) {
        dispatch({
            type: types.spinner,
            payload: bool,
        })
    }

    function _validate(close = true) {
        _spinner(true);
        dispatch({
            type: types.validate,
            payload: { value: _value, close }
        })
        _spinner(false);
    }

    function _getState() {
        _validate();

        return {
            value: _value,
            valid: _state.valid,
        }
    }

    return {
        set,
        getState: () => _getState(),
        clear: () => {
            _setValue('');
            dispatch({ type: types.reset });
        },
        props: {
            ..._state,
            value: _value,
            penclick,
            onChange: (e) => {
                _setValue(e.target.value);
                dispatch({ type: types.reset });
            },
            onBlur: () => _validate(),
        },
    }
}