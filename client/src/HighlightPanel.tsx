import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { MainPageState } from './Main';
import { PAGE_TYPES } from './options';
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
                            {this.props.page === PAGE_TYPES[2] && <h2 style={{ color: "red" }}>No Video to Play. Please Select Atleast One Option and Submit.</h2>}
                            {[PAGE_TYPES[0], PAGE_TYPES[1]].includes(this.props.page) && <h2 style={{ color: "red" }}> Please Provide an youtube url for a {this.props.page} Video</h2>}
                        </Row>
                        <br></br>
                        <Row noGutters>
                            {this.props.page === PAGE_TYPES[2] && <p>Please select options from right side and submit to View Highlights Video</p>}
                            {[PAGE_TYPES[0], PAGE_TYPES[1]].includes(this.props.page) && <p>We will process the video and mail you a link to download the highlights video in a short time.</p>}
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