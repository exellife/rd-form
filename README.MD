# React Dynamic Input #

## [**See Demo**](http://34.66.39.240/demo/rd-form/dev/) ##

## Installation ##

#### npm ###
```
npm install @exel/rd-form@1.0.0-beta-c
```

### CDN ###
```html
<script type="text/javascript" src="https://unpkg.com/@exel/rd-form@1.0.0-beta-c/dist/umd/rdform.min.js"></script>
```

## Usage ##
```javascript
// SomeComponent.jsx

import { useEffect } from 'React';
import {
    RDForm,
    useRDInput,
    RDInput,
} from 'ReactDynamicForm';

function SomeComponent() {
    // create input references
    const EmailInput = useRDInput();
    const PswdInput = useRDInput();
    const NameInput = useRDInput();

    // custom icon needs to be provided
    // in case it's necessary to appear 
    // in the input's closed state
    // in this case it's just `edit` sign
    const _btn = (
        <i>edit</i>
    );
    
    useEffect(() => {
        EmailInput.set({
            // your validator function
            validator: validateEmail, 
            type: 'email', // required
            id: 'email', // required
            name: 'email', // required
            label: 'email', // required
            // value could be set dynamically
            value: 'invalid.email', 
            // give a hint to a user
            hint: '', 
            // clickable - means that input closes itself
            // if input is valid 
            // and could reopen on click
            clickable: true,
            // your custom icon 
            btn: _btn,
        });

        PswdInput.set({
            // your validator function
            validator: validatePswd, 
            type: 'password',
            id: 'password',
            name: 'password',
            label: 'password',
            value: '',
            hint: 'Must be at least 10 characters long',
            // do not make password clickable
            // it defaults to false
            // so you can skip this
            clickable: false 
        });

        NameInput.set({
            type: 'text',
            id: 'full-name',
            name: 'full-name',
            label: 'Full Name',
            value: 'James Bond',
            clickable: true,
            btn: _btn,
            // question mark appears
            // at the right top corner of the input
            // with clarification on hover
            question: 'Why do i need to write here. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        })

    }, []);


    function submit(e) {
        e.preventDefault();

        const emailState = EmailInput.getState();
        const nameState = NameInput.getState();
        const pswdState = PswdInput.getState();

        // getState() method returns object
        // { value: String, valid: Boolean } 
        // so it could be used as e.g
        if (emailState.valid) { 
            /* do something with emailState.value */
        };
        

        console.log(emailState);
        console.log(nameState);
        console.log(pswdState);
    };

    // custom styles
    // in this case target is a signle element
    const styles = { 
        form: {
            maxWidth: '400px'
        },
    };

    return (
        <>
            <RDForm styles={styles}>
                <RDInput {...EmailInput.props} />
                <RDInput {...NameInput.props} />
                <RDInput {...PswdInput.props} />

                <button onClick={e => submit(e)}>submit</button>
            </RDForm>
        </>
    );
}
```

### Validator Function Example ###
```javascript
// always takes single string input
// in this case parameter `str`
// and should always return [boolean, String]
function validateSomething(str) {
    // do your logic with str
    if ( matchesMyLogic(str) ) {
        // true means valid input
        // and you could show optional message to a user
        return [true, 'Optional message']
    }
    // otherwice, if it didn't match your logic
    return [false, 'Your error message']
}

// here is actual email validator used in the demo
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
```

## Styling ##
#### Default inline styles ####
```javascript
const defaultStyles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
    },
    rdWrap: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '16px',
    },
    inputContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentLabelWrap: {
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'italic',
        textTransform: 'capitalize'
    },
    contentLabel: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {

    },
    clickable: {
        cursor: 'pointer',
    },
    label: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontStyle: 'italic',
        marginBottom: '4px',
    },
    labelWrap: {
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    hint: {

    },
    hintP: {
        margin: '0',
        marginLeft: '4px',
    },
    input: {

    },
    // TextArea is not supported yet
    textArea: {
        resize: 'none',
    },
    question: {

    }
};
```

#### Overriding defualt styles ####
```javascript
// SomeComponent.jsx

function SomeComponent() {
    // ... code
    const customStyles = { 
        form: {
            maxWidth: '400px'
        },
        rdWrap: {
            marginBottom: '24px',
        },
        // target any key in defaultStyles
        // with your custom inline style
    };

    return (
        <>  
            {/* pass customStyles as a prop to RDForm */}
            <RDForm styles={customStyles}>
                <RDInput {...EmailInput.props} />
                <RDInput {...NameInput.props} />
                <RDInput {...PswdInput.props} />

                <button onClick={e => submit(e)}>submit</button>
            </RDForm>
        </>        
    )
}
```

### CSS ###
```css
/* available css selectors */
.rd-input-wrap { /* ... */ };
.rd-input-content { /* ... */ };
.rd-content-label { /* ... */ };
.rd-content-label-wrap { /* ... */ };
.rd-content { /* ... */ };
.rd-clickable { /* ... */ };
.rd-label { /* ... */ };
.rd-label-wrap { /* ... */ };
.rd-hint { /* ... */ };
.rd-hint-p { /* ... */ };
.rd-input { /* ... */ };
.rd-spinner { /* ... */ };
.rd-question { /* ... */ };
```