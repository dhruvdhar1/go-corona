import React, { PureComponent } from 'react';
import './DetailsPane.scss'

class DetailsPane extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content: props.data ? props.data : [],
            colorPallet: props.colorPallet,
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.content !== nextProps.content) {
            return {
                content: nextProps.data ? nextProps.data : []
            }
        }
    }
    renderContent(item, index) {
        const { colorPallet } = this.state;
        return (
            <div className="field-container" key={item.id}>
                <div className="data-point" style={{backgroundColor: colorPallet[index % 5]}}/> &nbsp;
                <span>{`${item.key} :`}</span>&nbsp;
                <span>{`${item.value}`}</span>
            </div>
        )
    }
    render() {
        const { content } = this.state;
        return (
            <div className="fields-parent">
                {
                    content.map((item, index) => {
                        return(
                            this.renderContent(item, index))
                    })
                }
            </div>
        )
    }
}
export default DetailsPane;