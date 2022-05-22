export const commonStyles = () => `
* {
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
}

.button {
    border-radius: 2px;
    cursor: pointer;
    font-family: Monospace, Verdana, Arial, Sans-Serif;
    padding: 4px 8px;
    text-transform: capitalize;
}

.button--type-primary {
    background-color: rgb(15, 79, 143);
    border: 1px solid rgb(9, 58, 113);
    color: #eee;
}

.button--type-primary:hover {
    background-color: rgb(37 118 189);
}

.button--type-secondary {
    background-color: rgb(250, 250, 250);
    border: 1px solid rgb(9, 58, 113);
    color: rgb(15, 79, 143);
}

.button--type-secondary:hover {
    background-color: rgb(238, 238, 238);
}

.form-control {
    display: flex;
    margin: 0 0 0.4rem 0;
}

.form-control .name {
    width: 40%;
}

.form-control .value {
    width: 60%;
}

.form-control .value input,
.form-control .value select {
    display: block;
    width: 100%;
}
`
