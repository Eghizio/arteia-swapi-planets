import React, { useState, useEffect } from "react";

const PlanetList = () => {
    const [planetNames, setPlanetNames] = useState<string[]>([]);
    useEffect(() => {
        fetch("/api/planets") //proxy "https://swapi.co"
            .catch((err:Error) => console.error(err))
            .then((res:any) => res.json())
            .then(data => {
                const names: string[] = data.results.map((p:{name:string}) => p.name);
                setPlanetNames([...names]);
            });
    },[]);

    interface PlanetProps { name: string };
    const Planet: React.FC<PlanetProps> = ({name}) => {
        return (
            <div style={{width: "300px", margin: "2px auto", borderRadius: "5px", backgroundColor: "skyblue"}}>
                {name}
            </div>
        );
    };

    const Loading: React.FC = () => <div>loading . . .</div>;

    return (
        <div>
            {!(planetNames.length > 0)? <Loading/> :
                planetNames.map((planetName, i) => 
                    <Planet key={i} name={planetName}/>
                )
            }
        </div>
    );
};

export default PlanetList;