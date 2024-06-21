import { StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'

const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
        >
            {children}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
    },
});

module.exports = FormContainer;
