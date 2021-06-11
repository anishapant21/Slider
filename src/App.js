import React, {useState, useEffect} from 'react';
import data from './Data/data'; 
import {FaChevronLeft, FaChevronRight, FaQuoteRight} from 'react-icons/fa';

const App = () => {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        const lastIndex= people.length -1;
        if (index < 0){
            setIndex(lastIndex)
        } else if (index > lastIndex){
            setIndex(0)
        }
    }, [index, people]);

    //we can have as many useEffect as we want

    useEffect(()=>{
        let slider= setInterval(()=>{
            setIndex(index +1)

        }, 3000);
        return ()=>clearInterval(slider);
    }, [index]);


    return (
    <section className="section">
        <div className="title">
            <h2>
                <span>/</span>reviews
            </h2>
        </div>
        <div className="section-center">
            {people.map((person, personIndex)=> {
                const {id, image, name, title, quote} = person;
                let position = 'nextSlide'
                if (personIndex === index){
                    position='activeSlide';
                }
                if(personIndex=== index-1 || (index === 0 && personIndex=== people.length-1)){
                    position='lastSlide'
                }


                return <article className={position} key={id}>
                    <img src={image} alt={name} className='person-img' />
                    <h4>{name}</h4>
                    <p className="title"> {title}</p>
                    <p className="text">{quote}</p>
                    <FaQuoteRight className='icon' />

                </article>


            })}
            <button className="prev" onClick={()=>setIndex(index-1)}>
                <FaChevronLeft />
            </button>
            <button className="next" onClick={()=>setIndex(index+1)}>
                <FaChevronRight />
            </button>
        </div>

    </section>);
}

export default App;


//we use useEffect because tyo index negative vako bela ma or greater than array ma it doesnt work
//