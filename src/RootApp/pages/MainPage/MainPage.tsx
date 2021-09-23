import './MainPage.scss';
import React from 'react';

export type TMainPageComponent = () => JSX.Element;

/**
 * Главная страница
 */
const MainPage: TMainPageComponent = () => <h3>MainPage</h3>;

export default React.memo(MainPage);
