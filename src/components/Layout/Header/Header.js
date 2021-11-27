import React, { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton/HeaderCartButton';

import classes from './Header.module.css';

import mealsImg from '../../../assets/img/meals.jpg'

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="A table full of delicious food!" />
        </div>
    </Fragment>
}

export default Header;