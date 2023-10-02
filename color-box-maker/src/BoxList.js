import { useState } from 'react';
import { v4 as uuidv4} from 'uuid';
import './BoxList.css';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

const BoxList = () => {
    const initialState = [{
        height: "50px",
        width: "50px",
        backgroundColor: "gold",
        id: uuidv4()
    }];
    
    const [boxes, setBoxes] = useState(initialState);

    const addBox = (height, width, backgroundColor, id=uuidv4()) => {
        setBoxes(boxes => [...boxes, {height, width, backgroundColor, id}]);
    }

    const removeBox = (uniqueId) => {
        setBoxes(
            boxes => boxes.filter(
                ({ id }) => id !== uniqueId
            )
        )
    };

    return (
        <div className="box-list-container">
            <NewBoxForm addBox={addBox}/>
            <div className="boxes-container">
                {boxes.map(({height, width, backgroundColor, id}) => <Box height={height} width={width} backgroundColor={backgroundColor} remove={removeBox} id={id} key={id} />)}
            </div>
        </div>
    );
}

export default BoxList;