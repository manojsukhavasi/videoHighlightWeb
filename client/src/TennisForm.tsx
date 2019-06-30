import React from 'react';
import { Button, Form, Col, Row, FormControlProps } from 'react-bootstrap';
import { API_CALL, API_TIMEOUT_SECONDS } from './constant';
import { GlobalSpinner } from './GlobalSpinner';
import { fetchWrapper } from './apiHandler';
import { isValidUrl } from './utis';

interface FORM_OPTION_OBJ {
    [typeKey: string]: string;
}

type Props = { onResponse: Function };
type State = { showSpinner: boolean; selectedObj: FORM_OPTION_OBJ, valid: boolean };

export interface APIResponse {
    url: string;
}

export class TennisForm extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            showSpinner: false,
            selectedObj: {
                inputUrl: "",
                startTime: "",
                endTime: ""
            },
            valid: false
        };
    }

    onSelect = (typeKey: string, value: string) => {
        const selectObjToUpdate: FORM_OPTION_OBJ = this.state.selectedObj;
        selectObjToUpdate[typeKey] = value;
        let valid = isValidUrl(selectObjToUpdate["inputUrl"]);
        this.setState({
            selectedObj: selectObjToUpdate,
            valid
        });
    }

    callApi = () => {
        this.setState({
            showSpinner: true
        })
        fetchWrapper(API_CALL.IP + API_CALL.TENNIS_ENDPOINT,
            {
                method: API_CALL.METHOD,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    parameters: this.state.selectedObj
                })
            },
            API_TIMEOUT_SECONDS ? API_TIMEOUT_SECONDS * 1000 : 0
        ).then((res) => {
            return res.json()
        }).then((res: APIResponse) => {
            this.setState({
                showSpinner: false
            })
            this.props.onResponse(res);
        }).catch(err => {
            this.setState({
                showSpinner: false
            })
            this.props.onResponse({ url: "error" })
        })
    }

    render() {
        return (
            <>
                {this.state.showSpinner && <GlobalSpinner />}
                <Row noGutters>
                    <h4>Tennis</h4>
                </Row>
                <Row noGutters>
                    <Form.Group as={Col}>
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control type="url" placeholder="Video URL" onChange={(e: React.ChangeEvent<FormControlProps>) => { this.onSelect("inputUrl", e.target.value ? e.target.value : "") }} />
                    </Form.Group>
                </Row>
                <Row noGutters>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control type="text" placeholder="MM:SS" onChange={(e: React.ChangeEvent<FormControlProps>) => { this.onSelect("startTime", e.target.value ? e.target.value : "") }} />
                        </Form.Group>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={5}>
                        <Form.Group>
                            <Form.Label>End Time</Form.Label>
                            <Form.Control type="text" placeholder="MM:SS" onChange={(e: React.ChangeEvent<FormControlProps>) => { this.onSelect("endTime", e.target.value ? e.target.value : "") }} />
                        </Form.Group>
                    </Col>

                </Row>

                <br></br>
                <Row noGutters>
                    <Button disabled={!this.state.valid} variant="info" style={{ width: "100%" }} onClick={this.callApi}>
                        Get Highlights from Video
                </Button>
                </Row>
            </>
        );
    }
} 