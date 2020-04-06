import React, { PureComponent } from 'react';
import './DetailsPane.scss'

class DetailsPane extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content || [],
            colorPallet: props.colorPallet,
        };
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
                    content.length && content.map((item, index) => {
                        return(
                            this.renderContent(item, index))
                    })
                }
            </div>
        )
    }
}
export default DetailsPane;