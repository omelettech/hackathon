import {Link} from "react-router-dom";
import "./FloatingButton.css"

export type FloatingButtonProps={
    text:string
    onPress:()=>void
}
function FloatingButton({text,onPress}:FloatingButtonProps){
    return(

        <div onClick={onPress} className="floating-button">
            {/* Hidden File Input */}
            <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                capture="environment"
                className="file-input"
            />

            {/* Camera Icon */}
            <label htmlFor="icon-button-file" className="camera-icon">
                <i className="fas fa-camera"></i>
            </label>
        </div>
    )
}

export default FloatingButton