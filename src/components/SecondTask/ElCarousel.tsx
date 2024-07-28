// modules
import React from "react";
import axios from "axios";

// redux
import { useAppDispatch } from "../../redux/store";
import { changeIsLoading, changeIsPopup, changeText } from "../../redux/reducers";

// main code

export const ElCarousel: React.FC<any> = ({item}: any) => {

	const str    = String(item.picId);
	const first  = str.slice(0, 3);
	const second = str.slice(3, 6);
	const third  = str.slice(6);

	const dispatch = useAppDispatch();

	const linkImg = `https://cdn-st2.smotrim.ru/vh/pictures/bq/${first}/${second}/${third}.jpg`

	const hundlerArticle =()=> {
		dispatch(changeIsLoading(true));

		axios
			.get(`https://cdnapi.smotrim.ru/api/v1/persons/${item.id}`)
			.then(response => {
				dispatch(changeText(`
					<div
					  style="display: flex; font-size: 40px; align-items: center"
					>
					  <img 
						  style="width: 200px; height: 200px; border-radius: 8px; margin-right: 32px" 
							src=${linkImg} 
							aria-label="корреспондент" 
							alt="корреспондент" />
						<div
						  style="display: flex; flex-direction: column; font-weight: 700"
						>
						  <span>${item.name}</span>
		          <span>${item.surname}</span>
						</div>
					</div>
					<div
					  style="font-size: 16px; font-weight: 400; line-height: 19.36px; margin-top: 40px"
					>
					  ${response.data.data.body}
					</div>
				`));
			})
			.catch(error => {
				console.log(error);
				dispatch(changeIsLoading(false));
			  dispatch(changeIsPopup(false));
			})
			.finally(()=> {
				dispatch(changeIsLoading(false));
			});
	};

	return <button 
		className="item" 
		key={item.id}
		onClick={()=> {
			hundlerArticle();
			dispatch(changeIsPopup(true));
		}}
	>
		<img src={`${linkImg}`} aria-label="корреспондент" alt="корреспондент" />
		<p>{item.name}</p>
		<p>{item.surname}</p>
	</button>
}