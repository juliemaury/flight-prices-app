import React, { Component } from 'react'

class Loading extends Component {
    render() {
        return (
            <svg className="loading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><path ng-attr-d="{{config.pathCmd}}" ng-attr-fill="{{config.color}}" stroke="none" d="M10 50A40 40 0 0 0 90 50A40 43 0 0 1 10 50" fill="#000000"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 51.5;360 50 51.5" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></path>
            </svg>
        )
    }
}

export default Loading;
