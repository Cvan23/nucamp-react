import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';
import { useSpring, animated } from 'react-spring';


const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 3) / 10, 1.1]
const trans = (x, y, s) => `perspective(800px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`


function RenderCard({item, isLoading, errMess}) {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 3, tension: 100, friction: 300 } }))
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
    return <h4>{errMess}</h4>;
    }
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
            <animated.div
            class="card"
            onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.interpolate(trans) }}
            >
            <Card className="card">
                <CardImg  src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </animated.div>
        </FadeTransform>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard
                     item={props.campsite}
                     isLoading={props.campsitesLoading}
                     errMess={props.campsitesErrMess}
                     />
                </div>
                <div className="col-md m-1">
                    <RenderCard 
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard
                        item={props.partner}
                        isLoading={props.partnerLoading}
                        errMess={props.partnerErrMess}
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;   