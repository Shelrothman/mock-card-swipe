import React, { useState, useEffect } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
import { Card, Icon, Image } from 'semantic-ui-react'
// import Cards from './Cards'



function Simple() {
    const [hasError, setErrors] = useState(false);
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5013/communities" )
            .then(res => res.json())
            .then(
                (result) => {
                    setCommunities(result);
                },
                //  important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                    setErrors(true);
                }
            )
    }, [])
    console.log(communities);



    // const characters = db
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div>
            <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
            <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
            <h1>React Tinder Card</h1>
            <div className='cardContainer'>
                {communities.map((community) =>
                    <TinderCard className='swipe' key={community.id}
                        onSwipe={(dir) => swiped(dir, community.community_name)}
                        onCardLeftScreen={() => outOfFrame(community.community_name)}>
                        {/* call back^ executed when the card leaves */}
                        <div className='card'>
                            <Card className='main-card'>
                                <img 
                                src='https://react.semantic-ui.com/images/avatar/large/matthew.png' 
                                alt='community-avatar'
                                className='item-img'  />
                                <Card.Content>
                                    <Card.Header>Matthew</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined in 2015</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Matthew is a musician living in Nashville.
                                    </Card.Description>
                                    <a>
                                        <Icon name='user' />
                                        22 Friends
                                    </a>
                                    </Card.Content>
                            </Card>
                        </div>
                    </TinderCard>
                )}
            </div>
            {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
        </div>
    )
}

export default Simple
