import React, { PureComponent } from 'react';
import './DetailsPane.scss'

class DetailsPane extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content: [
                {
                    imgSrc: '/Users/d0d00js/Desktop/GoCorona/go-corona-fe/src/assets/test-image.png',
                    name: 'AAAAAA',
                    value: '8976545',
                    id: 1,
                },
                {
                    imgSrc: 'src/assets/test-image.png',
                    name: 'BBBBB',
                    value: '23763',
                    id: 2,
                },
                {
                    imgSrc: 'src/assets/test-image.png',
                    name: 'CCCCC',
                    value: '8976545',
                    id: 3,
                }
            ],
            colorPallet: props.colorPallet,
        };
    }
    renderContent(item, index) {
        const { colorPallet } = this.state;
        return (
            <div className="field-container" key={item.id}>
                <div className="data-point" style={{backgroundColor: colorPallet[index % 5]}}/> &nbsp;
                <span>{`${item.name} :`}</span>&nbsp;
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