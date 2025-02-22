import {Link} from "react-router-dom";
import "./FloatingButton.css"

export type FloatingButtonProps={
    text:string
    onPress:()=>void
}
function FloatingButton({text,onpress}:FloatingButtonProps){
    return(
        <button onClick={onpress} className={"floating-button"}>
            {text}

        </button>
    )
}

export default FloatingButton