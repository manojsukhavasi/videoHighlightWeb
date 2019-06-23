import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { HighlightForm, APIResponse } from './HighlightForm';
import { HighlightPanel } from './HightlightPanel';
import { DEFAULT_VIDEO } from './constant';

type Props = {};
type State = { url: string; };

export class Main extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            url: DEFAULT_VIDEO,
            // moment: "demo",
            // type: "highlights"
        }
    }

    onAPIResponse = (res: APIResponse) => {
        this.setState({
            ...res
        })
    }

    render() {
        return (
            <>
                <Row noGutters>
                    <Col md={9} style={{ padding: "20px" }}>
                        <HighlightPanel {...this.state} />
                    </Col>
                    <Col md={3} style={{ height: '94vh', overflow: 'auto', padding: "20px" }}>
                        <HighlightForm onResponse={this.onAPIResponse} />
                    </Col>
                </Row>
            </>
        );
    }
}  