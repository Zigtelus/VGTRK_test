// modules
import React, { useEffect, useRef } from "react";

// styles
import "./index.scss";

// redux
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { changeIsPopup, changeText } from "../../redux/reducers";

// main code

export const Popup: React.FC = () => {

	const text      = useAppSelector(state => state.popupReducer.popup.text);
	const isLoading = useAppSelector(state => state.popupReducer.popup.isLoading);

	const refText   = useRef<HTMLDivElement>(null);
	const dispatch  = useAppDispatch();

	useEffect(() => {
		if (refText.current) {
			refText.current.innerHTML = text;
		}
  }, [text, isLoading]);

	return <>
	  { 
	    <div className="popup">

		    <div className="popup__content">

				  {
					  isLoading 
						? 
						"идет загрузка" 
						:
						<>
		          <button 
							  title="закрыть popup"
								aria-label="закрыть popup"
				        className="popup__close"
				        onClick={()=> {
					        dispatch(changeIsPopup(false));
					        dispatch(changeText(""));
				        }}
			        ></button>

		          <div className="popup__body">
				        <div 
				          className="popup__text"
					        ref={refText}
				        ></div>
		          </div>
						</>
				  }
	      </div>
	    </div>
    }
	</>
}