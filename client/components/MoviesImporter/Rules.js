// Core
import React from 'react';

const Rules = (props) => {
    return (
        <ol>
            <strong>Rules:</strong>
            <li>Files format: only <strong>.txt</strong>;</li>
            <li>Every movie should be separated by a line break;</li>
            <li>Every movie's field should end with a line break;</li>
            <li>Every field has key and value which are separated with a punctuation mark (:);</li>
            <li>Every movie has next keys: Title, Release Year, Format, Stars;</li>
            <li>Stars value should be a string, where every actor is separated with comma.</li>
        </ol>
    )
}

export default Rules;