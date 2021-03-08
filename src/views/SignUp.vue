<template>
<div>
    <div class="container">
        <div class="row">
            <h2> Sign Up Menu </h2>
        </div><br>
        <p>
            <label for="firstname" class="floatLabel">First Name</label>
            <input id="firstname" name="firstname" type="text">
        </p>
        <p>
            <label for="lastname" class="floatLabel">Last Name</label>
            <input id="lastname" name="lastname" type="text">
        </p>
        <p>
            <label for="username" class="floatLabel">Username</label>
            <input id="username" name="username" type="text">
        </p>
        <p>
            <label for="password" class="floatLabel">Password</label>
            <input id="password" name="password" type="password">
        </p>
        <p>
            <label for="confirm_password" class="floatLabel">Confirm Password</label>
            <input id="confirm_password" name="confirm_password" type="password">
            <span>Your password do not match!</span>
        </p>
        <p><input type="submit" value="Sign Me Up" id="submit"></p>
    </div>
</div>
</template>

<style lang="scss">
$button: rgba(34, 201, 201, 0.781);

div[class="container"] {
    background: #fff;
    padding: 2em 4em 2em;
    max-width: 500px;
    margin: 50px auto 0px;
    box-shadow: 0 0 1em #222;
    border-radius: 10px;

    h2 {
        margin: 0 0 20px 0;
        padding: 10px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        padding-left: 10px;
    }

    p {
        margin: 0 0 2em 0;
        height: 80%;
        position: relative;
    }

    input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 1%;
        outline: none;
        margin: 0px;
    }

    input[type="text"],

    input[type="password"] {
        background: #fff;
        border: 1px solid #dbdbdb;
        font-size: 1.6em;
        padding: .8em .5em;
        border-radius: 2px;
    }

    input[type="text"]:focus,
    input[type="password"]:focus {
        background: #fff
    }

    span {
        display: block;
        background: #f9a5a5;
        padding: 2px 5px;
        color: #666;
    }

    input[type="submit"] {
        background: $button;
        box-shadow: 0 3px 0 0 darken($button, 10%);
        border-radius: 50px;
        border: none;
        color: #fff;
        cursor: pointer;
        display: block;
        font-size: 2em;
        line-height: 1.6em;
        margin: 1em 0 0;
        outline: none;
        padding: .1em 0;
        text-shadow: 0 1px #24c1cc;
    }

    label {
        position: absolute;
        left: 8px;
        top: 12px;
        color: #999;
        font-size: 16px;
        display: inline-block;
        padding: 4px 10px;
        font-weight: 400;
        background-color: rgba(255, 255, 255, 0);

        &.floatLabel {
            top: -11px;
            background-color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
        }
    }

}
</style>
