import React, { useState, useEffect } from "react";

const PlanetList = () => {
    const [planetNames, setPlanetNames] = useState<string[]>([]);
    const [expectedPlanetCount, setExpectedPlanetCount] = useState<number>();
    useEffect(() => {
        const fetchPage = (url:string) => {
            fetch(url)
                .catch((err:Error) => console.error(err))
                .then((res:any) => res.json())
                .then(data => {
                    if(expectedPlanetCount === undefined) setExpectedPlanetCount(data.count);
                        
                    const names: string[] = data.results.map((p:{name:string}) => p.name);
                    setPlanetNames(prev => [...prev,...names]);

                    if(data.next) fetchPage(data.next);
                });
        };

        fetchPage("https://swapi.co/api/planets/?page=1");
    },[]);

    interface PlanetProps { name: string };
    const Planet: React.FC<PlanetProps> = ({name}) => {
        return (
            <div className="planet">
                {name}
            </div>
        );
    };

    const Loading: React.FC = () => <div className="loading">loading . . .</div>;

    return (
        <div>
            {(planetNames.length !== expectedPlanetCount)? <Loading/> :
                planetNames.map((planetName, i) => 
                    <Planet key={i} name={planetName}/>
                )
            }
        </div>
    );
};

export default PlanetList;