
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


function validateSomething(str) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res([true, 'some message from backend'])
        }, 1000)
        // res([false, 'some message from backend'])
    })
}

// async function validateSomething(str) {

//     return [false, 'some message from backend']

// }

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
        <i>pen</i>
    );

    const PswdInput = useRDInput();
    const NameInput = useRDInput();

    // const SomeInput = useRDTextArea();

    useEffect(() => {

        EmailInput.set({
            validator: validateSomething,
            type: 'email',
            id: 'email',
            name: 'email',
            label: 'email',
            value: '',
            hint: 'this field is good',
            clickable: true,
            btn: _btn,

        });

        // PswdInput.set({
        //     validator: validatePswd,
        //     props: {
        //         type: 'password',
        //         id: 'password',
        //         name: 'password',
        //         label: 'password',
        //         value: '',
        //         hint: 'Must be at least 6 characters long',
        //         clickable: true,
        //         btn: _btn,
        //     }
        // });

        NameInput.set({
            type: 'text',
            id: 'full-name',
            name: 'full-name',
            label: 'Full Name',
            value: 'James Bond',
            clickable: true,
            btn: _btn,
            question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.'
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
                {/* <RDInput {...PswdInput.props} />
                
                <RDTextArea {...SomeInput.props} /> */}
                <button onClick={e => submit(e)}>submit</button>
            </RDForm>
        </>

    )
}

ReactDOM.render(<App />, target);

