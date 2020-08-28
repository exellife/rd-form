
/**
 * THIS FILE USED FOR DEVELOPMENT PURPOSES
 */

import { useEffect } from 'React';
import {
    RDForm,
    useRDInput,
    RDInput,
    // useRDTextArea,
    // RDTextArea,
} from 'ReactDynamicForm';


// function validateEmail(str) {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res([true, 'some message from backend'])
//         }, 1000)
//         // res([false, 'some message from backend'])
//     })
// }

function validateEmail(str) {

    if (!str.length) return [
        false,
        'This field is required to proceed'
    ];


    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

    const valid = re.test(str);
    let msg = '';
    if (!valid) msg = 'Invalid email address';
    return [valid, msg];
}

function validatePswd(str) {
    if (str.length > 10) {
        return [true, '']
    }
    return [false, 'Too short password']
}

const target = document.getElementById('target');
function App() {

    const EmailInput = useRDInput()
    const _btn = (
        <i>edit</i>
    );

    const PswdInput = useRDInput();
    const NameInput = useRDInput();

    // const SomeInput = useRDTextArea();

    useEffect(() => {

        EmailInput.set({
            validator: validateEmail,
            type: 'email',
            id: 'email',
            name: 'email',
            label: 'email',
            value: '',
            hint: '',
            clickable: true,
            btn: _btn,
            value: 'invalid.email'
        });

        PswdInput.set({
            validator: validatePswd,
            type: 'password',
            id: 'password',
            name: 'password',
            label: 'password',
            value: '',
            hint: 'Must be at least 10 characters long',
            clickable: true,
            btn: _btn,
        });

        NameInput.set({
            type: 'text',
            id: 'full-name',
            name: 'full-name',
            label: 'Full Name',
            value: 'James Bond',
            clickable: true,
            btn: _btn,
            question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        })

        // SomeInput.set({
        //     props: {
        //         id: 'my-text-area',
        //         name: 'my-text-area',
        //         label: 'My text area',
        //         value: '',
        //         clickable: true,
        //         btn: _btn,
        //         minLength: 100,
        //         maxLength: 240,
        //     }
        // })

    }, [])

    function submit(e) {
        e.preventDefault();
        // EmailInput.validate();
        // PswdInput.validate();
        const m = EmailInput.getState();
        // const p = PswdInput.getState();
        const n = NameInput.getState();
        // const t = SomeInput.getState();
        console.log(m);
        // console.log(p);
        console.log(n)
        // console.log(t);
    }

    const styles = {
        form: {
            maxWidth: '400px'
        },
    }

    return (
        <>
            <RDForm styles={styles}>
                <RDInput {...EmailInput.props} />
                <RDInput {...NameInput.props} />
                <RDInput {...PswdInput.props} />

                {/* <RDTextArea {...SomeInput.props} /> */}
                <button onClick={e => submit(e)}>submit</button>
            </RDForm>
        </>

    )
}

ReactDOM.render(<App />, target);

