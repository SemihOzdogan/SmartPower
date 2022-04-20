import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Row, Col } from 'native-base';

class RaporData extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Row style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <Col style={{ justifyContent: 'flex-start', margin: 5 }}>
                    <Text>{this.props.raporTitle} <Text style={styles.dataSubText}>{this.props.dataSymbol}</Text></Text>
                </Col>
                <Col style={styles.dataText}>
                    <Text style={{ textAlign: 'center' }}>{this.props.dataL1}{"\n"}<Text style={styles.dataSubText}>{this.props.subdataL1}</Text></Text>
                </Col>
                <Col style={styles.dataText}>
                    <Text style={{ textAlign: 'center' }}>{this.props.dataL2}{"\n"}<Text style={styles.dataSubText}>{this.props.subdataL2}</Text></Text>
                </Col>
                <Col style={styles.dataText}>
                    <Text style={{ textAlign: 'center' }}>{this.props.dataL3}{"\n"}<Text style={styles.dataSubText}>{this.props.subdataL3}</Text></Text>
                </Col>
            </Row>
        );
    }

}

export default RaporData;

const styles = StyleSheet.create({
    dataText: {
        justifyContent: 'center',
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#EBEBEB'
    },
    dataSubText: {
        fontSize: 10,
        color: 'gray',
        textAlign: 'center'
    }
});