import React from 'react';
import { Button, Form, Col, Row, FormControlProps } from 'react-bootstrap';
import { API_CALL } from './constant';
import { GlobalSpinner } from './GlobalSpinner';
import { HIGHLIGHT_TYPES } from './options';

interface FORM_OPTION_OBJ {
    [typeKey: string]: string;
}

type Props = { onResponse: Function };
type State = { showSpinner: boolean; selectedObj: FORM_OPTION_OBJ, valid: boolean };

export interface APIResponse {
    // moment: string;
    // type: string;
    url: string;
}

export class HighlightForm extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            showSpinner: false,
            selectedObj: {},
            valid: false
        };
    }

    componentDidMount() {
        this.resetOptions();
    }

    resetOptions = () => {
        const optionKeys = Object.keys(HIGHLIGHT_TYPES);
        const defaultOptions: FORM_OPTION_OBJ = {};
        optionKeys.forEach(key => {
            defaultOptions[key] = "";
        })

        this.setState({
            selectedObj: defaultOptions
        });
    }

    typeKeys = Object.keys(HIGHLIGHT_TYPES);


    convertBooleanForWicket = (value: string): boolean | null => {
        if (!value) return null;
        const val: any = {
            "undefined": null,
            "true": true,
            "false": false
        }
        return val[value];
    }

    onSelect = (typeKey: string, value: string) => {
        const selectObjToUpdate: FORM_OPTION_OBJ = this.state.selectedObj;
        selectObjToUpdate[typeKey] = value;
        let valid = false;
        for (let i = 0; i < this.typeKeys.length; i++) {
            const key = this.typeKeys[i];
            if (selectObjToUpdate[key] && HIGHLIGHT_TYPES[key].required) {
                valid = true;
                break;
            }
        }
        this.setState({
            selectedObj: selectObjToUpdate,
            valid
        });
    }

    callApi = () => {
        this.setState({
            showSpinner: true
        })
        const paramToSend: any = this.state.selectedObj;
        paramToSend["wicket"] = this.convertBooleanForWicket(paramToSend["wicket"]);
        fetch(API_CALL.IP + API_CALL.ENDPOINT,
            {
                method: API_CALL.METHOD,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // make sure to serialize your JSON body
                body: JSON.stringify({
                    parameters: paramToSend
                })
            }
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
                    <h4>Cricket</h4>
                </Row>
                <Row noGutters>
                    {this.typeKeys.map((optionKey: string, index: number) => {

                        return (
                            <Col md={6} key={index} style={{ padding: '4px' }}>
                                <Form.Group>
                                    <Form.Label>{HIGHLIGHT_TYPES[optionKey].title}</Form.Label>
                                    <Form.Control as="select" onChange={(e: React.ChangeEvent<FormControlProps>) => { this.onSelect(optionKey, e.target.value ? e.target.value : "") }}>
                                        <option value="">Choose {HIGHLIGHT_TYPES[optionKey].title}</option>
                                        {HIGHLIGHT_TYPES[optionKey].options.map((option) => {
                                            return <option key={option.title} value={option.value}>{option.title}</option>;
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        );
                    })}
                </Row>

                <br></br>
                <Row noGutters>
                    <Button disabled={!this.state.valid} variant="info" style={{ width: "100%" }} onClick={this.callApi}>
                        Show Highlight
                </Button>
                </Row>
            </>
        );
    }
} 