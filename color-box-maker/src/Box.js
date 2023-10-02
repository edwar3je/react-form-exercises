import { Fragment } from 'react';
import './Box.css';

const Box = ({height, width, backgroundColor, remove, id}) => {
    
    const styles = {height: height, width: width, backgroundColor: backgroundColor};

    const removeSquare = () => {
        alert(`Removed ${backgroundColor} square that's ${height} high and ${width} wide`);
        remove(id);
    }

    const string = `${backgroundColor}-${height}-${width}`;

    return (
        <Fragment>
            <div className="color-box" id={string} style={styles}></div>
            <button className="remove-button" id={string} onClick={removeSquare}>X</button>
        </Fragment>
    )
}

export default Box;