import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { MainPageState } from './Main';
//https://www.npmjs.com/package/react-player

type Props = MainPageState;
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
                            {this.props.page === "cricket" && <h2 style={{ color: "red" }}>No Video to Play. Please Select Atleast One Option and Submit.</h2>}
                            {this.props.page === "badminton" && <h2 style={{ color: "red" }}>No Video to Play. Please Provide Video URL and Submit.</h2>}
                        </Row>
                        <br></br>
                        <Row noGutters>
                            {this.props.page === "cricket" && <p>Please select options from right side and submit to View Highlights Video</p>}
                            {this.props.page === "badminton" && <p>Please give Video URL and We will generate Highlights from the Video</p>}
                        </Row>
                    </>
                )}
                {this.props.url === "error" && (
                    <>
                        <br></br>
                        <Row noGutters>
                            <h2 style={{ color: "red" }}>Something went bad. Please Try Again.</h2>
                        </Row>
                        <br></br>
                    </>
                )}
                {this.props.url && this.props.url !== "error" && (
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