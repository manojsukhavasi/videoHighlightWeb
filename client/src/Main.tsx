import React from 'react';
import { Col, Row, Navbar, NavbarBrand, Form, FormControlProps } from 'react-bootstrap';
import { HighlightForm, APIResponse } from './HighlightForm';
import { HighlightPanel } from './HightlightPanel';
import { DEFAULT_VIDEO } from './constant';
import { BadmintonForm } from './BadmintonForm';

type Props = {};
export interface MainPageState { url: string; page: "cricket" | "badminton" };

export class Main extends React.Component<Props, MainPageState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            url: DEFAULT_VIDEO,
            // moment: "demo",
            // type: "highlights"
            page: "cricket"
        }
    }

    setPage = (page: "cricket" | "badminton") => {
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
                        <NavbarBrand className={this.state.page === 'cricket' ? 'navMenuOptions active' : 'navMenuOptions'} onClick={() => this.setPage("cricket")}>
                            Cricket
                        </NavbarBrand>
                        <NavbarBrand className={this.state.page === 'badminton' ? 'navMenuOptions active' : 'navMenuOptions'} onClick={() => this.setPage("badminton")}>
                            Badminton
                        </NavbarBrand>
                    </Navbar.Collapse>
                </Navbar>
                <br></br>
                <Row noGutters className="onlyForMobile">
                    <Form.Group as={Col} style={{ padding: "20px" }}>
                        <Form.Control as="select" onChange={(e: React.ChangeEvent<FormControlProps>) => { this.setPage(e.target.value === "badminton" ? e.target.value : "cricket") }}>
                            <option value="cricket">Cricket</option>
                            <option value="badminton">Badminton</option>
                        </Form.Control>
                    </Form.Group>
                    {/* </Col> */}

                </Row>
                <Row noGutters>
                    <Col md={8} style={{ padding: "20px" }}>
                        <HighlightPanel {...this.state} />
                    </Col>
                    <Col md={4} className="highlightFormParent">
                        {this.state.page === "cricket" && <HighlightForm onResponse={this.onAPIResponse} />}
                        {this.state.page === "badminton" && <BadmintonForm onResponse={this.onAPIResponse} />}
                    </Col>
                </Row>
            </>
        );
    }
}  