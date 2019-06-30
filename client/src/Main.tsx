import React from 'react';
import { Col, Row, Navbar, NavbarBrand, Form, FormControlProps } from 'react-bootstrap';
import { HighlightForm, APIResponse } from './HighlightForm';
import { HighlightPanel } from './HightlightPanel';
import { DEFAULT_VIDEO } from './constant';
import { BadmintonForm } from './BadmintonForm';
import { PAGE_TYPES } from './options';
import { TennisForm } from './TennisForm';

type Props = {};
export interface MainPageState { url: string; page: string };

export class Main extends React.Component<Props, MainPageState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            url: DEFAULT_VIDEO,
            page: PAGE_TYPES[0]
        }
    }

    setPage = (page: string) => {
        this.setState({
            page,
            url: ""
        })
    }

    onAPIResponse = (res: APIResponse) => {
        this.setState({
            ...res
        })
    }

    render() {
        return (
            <>
                <Navbar bg="info" variant="dark" style={{ paddingBottom: 0, paddingTop: 0, paddingRight: 0 }}>
                    <NavbarBrand>
                        Video Highlights Viewer
                    </NavbarBrand>
                    <Navbar.Collapse className="justify-content-end">
                        {PAGE_TYPES.map(p => {
                            return (<NavbarBrand key={p} className={this.state.page === p ? 'navMenuOptions active' : 'navMenuOptions'} onClick={() => this.setPage(p)}>
                                {p}
                            </NavbarBrand>);
                        })}
                    </Navbar.Collapse>
                </Navbar>
                <br></br>
                <Row noGutters className="onlyForMobile">
                    <Form.Group as={Col} style={{ padding: "20px" }}>
                        <Form.Control as="select" onChange={(e: React.ChangeEvent<FormControlProps>) => { this.setPage(e.target.value || PAGE_TYPES[0]) }}>
                            {PAGE_TYPES.map(p => {
                                return <option key={p} value={p}>{p}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    {/* </Col> */}

                </Row>
                <Row noGutters>
                    <Col md={8} style={{ padding: "20px" }}>
                        <HighlightPanel {...this.state} />
                    </Col>
                    <Col md={4} className="highlightFormParent">
                        {this.state.page === PAGE_TYPES[0] && <HighlightForm onResponse={this.onAPIResponse} />}
                        {this.state.page === PAGE_TYPES[1] && <BadmintonForm onResponse={this.onAPIResponse} />}
                        {this.state.page === PAGE_TYPES[2] && <TennisForm onResponse={this.onAPIResponse} />}
                    </Col>
                </Row>
            </>
        );
    }
}  