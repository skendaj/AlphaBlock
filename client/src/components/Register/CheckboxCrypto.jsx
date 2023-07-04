import React from 'react';
import './CheckboxCrypto.css';

const CheckboxCrypto = () => {
    return (
        <div class="checkbox-wrapper-4">
            <input type="checkbox" id="newToCrypto" class="inp-cbx" />
            <label for="newToCrypto" class="cbx"><span>
                <svg height="10px" width="12px">
                </svg></span><span>I am new to crypto</span></label>
            <svg class="inline-svg">
                <symbol viewBox="0 0 12 10" id="check-4">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </symbol>
            </svg>
        </div>
    );
};

export default CheckboxCrypto;
