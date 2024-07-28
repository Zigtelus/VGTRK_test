// modules
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

// components
import { ElCarousel } from './ElCarousel';

// main code

export const SecondTask: React.FC = ()=> {

	const [persons, setPersons] = useState<null | any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const refMainBlock = useRef<any>(null);

	useEffect(()=> {
		setIsLoading(true);
		
		axios
		  .get('https://cdnapi.smotrim.ru/api/v1/boxes/vesti2')
		  .then(response => {
				setPersons(response.data.data.content[2].content[1].content);
      })
      .catch(error => {
        console.log(error);
				setIsLoading(false);
      })
			.finally(()=> {
				setIsLoading(false);
			});
	}, []);

  const responsive = {
    0: { items: Math.floor(refMainBlock.current?.offsetWidth / 160) }
  };

	let ElemsCarousel = null;
	if (!!persons) {
	  ElemsCarousel = persons.map(item => <ElCarousel item={item}/>);
	};

	return <div ref={refMainBlock} className="second_task">
		second task
    {
			isLoading
			?
			<div>
				идет загрузка
			</div>
			:

			!!persons 
			? 
			<AliceCarousel
			  disableDotsControls
			  mouseTracking
			  items            = {ElemsCarousel}
			  responsive       = {responsive}
			  controlsStrategy = "alternate"
				touchTracking    = {false}
	    />
			:
			<div>персоны не загрузились</div>
		}
	</div>
}