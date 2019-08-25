import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window")

export default function ToDo() {

    const [isEditing, setIsEditing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { setIsComplete(!isComplete) }}>
                <View style={styles.circle}></View>
            </TouchableOpacity>
            <Text style={styles.text}>hello</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: "red",
        borderWidth: 3,
        marginRight: 20
    },
    text: {
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20
    }
});