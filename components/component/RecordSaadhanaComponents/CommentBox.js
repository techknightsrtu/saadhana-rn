import { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import styles from '../../assets/styles/StylesRecordSaadhana';

const CommentBox = ({ comment, setcomment }) => {
    const maxchar = 300
    const prefilledtextcolor = 'black'

    return (
        <View style={styles.boxes}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Comments,If any</Text>
                <Text style={{ color: '#7f7f7f', fontSize: 12, marginBottom: 5 }}>Write anything you want to share with your counsellor</Text>
            </View>

            <TextInput
                style={[styles.comment_input, comment === 'Hare Krishna ! All glories to Srila Prabhupada' && { color: prefilledtextcolor }]}
                multiline
                maxLength={maxchar}
                value={comment}
                textAlignVertical='top'
                selectTextOnFocus={true}
                onChangeText={(text) => setcomment(text)}

            // defaultValue={text}
            />
            <Text style={{ marginTop: 7, color: '#7f7f7f' }}>
                {comment.length}/{maxchar}
            </Text>
        </View>
    )
}

export default CommentBox