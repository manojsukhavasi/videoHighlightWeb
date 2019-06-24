import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { APIResponse } from './HighlightForm';
//https://www.npmjs.com/package/react-player

type Props = APIResponse;
type State = {};

export class HighlightPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <>
                {!this.props.url && (
                    <>
                        <br></br>
                        <Row noGutters>
                            <h2 style={{ color: "red" }}>No Video to Play. Please Select Atleast One Option and Submit.</h2>
                        </Row>
                    </>
                )}
                {this.props.url && (
                    <>
                        <Row noGutters>
                            <h4>Highlights Video Playing...</h4>
                        </Row>
                        <br></br>
                        <Row noGutters>
                            <Col>
                                <div className='player-wrapper'>
                                    <ReactPlayer
                                        className='react-player'
                                        width='100%'
                                        height='100%'
                                        url={this.props.url}
                                        playing
                                        controls
                                    />
                                </div>

                            </Col>
                        </Row>
                    </>
                )
                }
            </>
        );
    }
}  