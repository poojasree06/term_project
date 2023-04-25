import React from "react";

export default function Input(props){
    return(
         <div class="input-data">
                 <input type="text" name={props.name} value={props.value} onChange={props.onChange} required />
                 <div class="underline"></div>
                 <label for="">{props.inputName}</label>
        </div>
    );
}