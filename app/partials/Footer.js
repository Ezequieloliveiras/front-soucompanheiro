// src/components/Footer.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledButton from '../components/buttons/Button';
const Footer = () => {
    return (
        <View style={styles.footer}>
            <StyledButton
                height={40}
                padding={10}
                backgroundColor='#007AFF'
                title={'Minhas Inscricões'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'radial-gradient(circle, rgba(223,223,223,0.44021358543417366) 0%, rgba(255,255,255,1) 100%)',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#e7e7e7',
        alignItems: 'center',
    },
    footerText: {
        color: '#333',
    },
});

export default Footer;
