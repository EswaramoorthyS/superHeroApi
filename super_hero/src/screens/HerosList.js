import React from 'react'

const HeroList = ({ item }) => {
    console.log(item, "kkkkkkkk");

    return (
        <div className='card'>
            <div className='card-inner'>
                <div className='card-front'>
                    <img src={item.image.url} alt={item.name} />
                </div>
                <div className='card-back'>
                    <h1>{item.name}</h1>
                    <ul>
                        <li>
                            <strong>Actor Name: </strong> {item.name}
                        </li>
                        {item.appearance.gender &&
                            <li>
                                <strong>Gender: </strong> {item.appearance.gender}
                            </li>
                        }
                        {item.powerstats.length > 0 &&
                            <li>
                                <strong>powerstats: </strong> {item.powerstats.combat}
                            </li>
                        }
                        {item.biography.publisher !== '' &&
                            <li>
                                <strong>publisher: </strong> {item.biography.publisher}
                            </li>
                        }
                        <li>
                            <strong>Character life: </strong> {item.biography.alignment}
                        </li>
                        {item.work.base !== '-' &&
                            <li>
                                <strong>City: </strong>
                                {item.work.base}
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default HeroList;
