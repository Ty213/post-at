import React from 'react';
import { connect } from 'react-redux';
import CardListItem from './CardListitem';

const CardList = (props) => {
    const Styles = {
        width: "80%",
        marginTop: "5rem",
        marginBottom: "5rem"
    }
    return (
    <div>
        <div className="cardlist" style={Styles}>
            {
                props.bleps.map((blep) => (
                    <CardListItem key={blep.id} {...blep} />
                ))
            }
        </div>
    </div>
    )
};

const mapStateToProps = (state, props) => {
    return {
        bleps: state.bleps
    };
};

export default connect(mapStateToProps)(CardList);

    

