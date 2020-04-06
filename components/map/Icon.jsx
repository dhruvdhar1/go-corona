import React from 'react';
import styled from 'styled-components'
import styles from './styles.scss'

const Container = styled.div`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 8px;
        position: absolute;
        opacity: 0.5;
        
        -webkit-transform: scale(0) rotate(0);
        -moz-transform: scale(0) rotate(0);
        -ms-transform: scale(0) rotate(0);
        -o-transform: scale(0) rotate(0);
        transform: scale(0) rotate(0); 
         
        -webkit-transition: 500ms;
        -moz-transition: 500ms;
        -ms-transition: 500ms;
        -o-transition: 500ms;
        transition: 500ms;
        
      
        img {
            width: 100%;
         }
         
         &:hover{
            -webkit-transform: scale(1.1) rotate(360deg);
            -moz-transform: scale(1.1) rotate(360deg);
            -ms-transform: scale(1.1) rotate(360deg);
            -o-transform: scale(1.1) rotate(360deg);
            transform: scale(1.1) rotate(360deg); 
         
            opacity: 1;
            z-index: 10;
            div:first-child{
                opacity: 1;
            }
       }
    `


const Details = styled.div`
        position: absolute;
        top: 0;
        background: white;
        opacity: 0;
        z-index: 101;
        transition: 300ms ease-in;
        
        width: 200px; 
        
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        
        box-shadow: 0px 0px 20px rgba(0,0,0,.1);
        
        padding: .5em 1em;
        border-radius: 10px;
        transform: translateY(-120%) translateX(-35%);
   `

const Icon = ({path, coords, active, revealed, color, transitionDelay }) => {

    return (
        <Container style={{ ...coords, transitionDelay: transitionDelay, background: color, boxShadow: '0px 0px 10px ' + color }} className={[revealed ? styles.reveal : '', active ? styles.activate : ''].join(" ")}>
            <Details>
                <div>
                    <p style={{fontSize: '14px', fontWeight: 'bold', margin: 0}}>Котенок</p>
                    <span style={{fontSize: '14px', color: '#b8bdc5'}}>12 Апреля</span>
                </div>
                <div>
                    <p style={{margin: 0, color: '#4caf50'}}>$360</p>
                </div>
                <div className={styles.triangle}/>
            </Details>
            <img src={path}/>
        </Container>
    );
};

Icon.defaultProps = {
    color: "#3452ff"
}

export default Icon;