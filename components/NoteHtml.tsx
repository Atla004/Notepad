import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { editJSONData, fetchData, getJSONData } from "@/services/localstorage";
import { editNote } from "@/services/notes";
import { Text } from "react-native-paper";

interface NoteHtmlProps {
  content: string;
}

export const NoteHtml = ({content}:NoteHtmlProps ) => {
  const [editorContent, setEditorContent] = useState<string>("");
  const [remainingChars, setRemainingChars] = useState<number>( );

  const setContent = (content: string) => {
    setEditorContent(content);
  };

  const handleEditorChange = async () => {
    try {
      const content = await editor.getHTML();
      const text = await editor.getText();
      if (text.length <= 250) {
        setEditorContent(content);
        setContent(content);
        console.log("content", content);
        console.log("content.length", content.length);
        setRemainingChars(250 - text.length);
        console.log("remainingChars", remainingChars);
      } else {
        Alert.alert(
          "Character Limit Exceeded",
          "You can only enter up to 250 characters."
        );
        await editor.setContent(editorContent); // Revertir al contenido anterior
      }
    } catch (error) {
      console.log("Error al obtener el contenido de la nota", error);
    }
  };

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: editorContent,
    onChange: handleEditorChange,
    
  });

  useFocusEffect(
    useCallback(() => {
      setContent();

      return async() => {
        await saveNoteContent();
      }
    }, [])
  );


  const saveNoteContent = async () => {
    try {
      console.log("saveNoteContent method");
      const username = await fetchData("username");
      await editJSONData("active-note", { content: editorContent });
      const dataToSave = await getJSONData("active-note");

      console.log("dataToSave", dataToSave);

      await editNote(username, dataToSave);

      console.log("saveNoteContent method Finished");
    } catch (error) {
      console.log("Error al guardar la nota", error);
    }
  };

  return (
    <>
      <Text style={styles.charCount}>
        Characters remaining: {remainingChars}
      </Text>
      <RichText editor={editor} />
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  charCount: {
    textAlign: "right",
    marginRight: 10,
    marginTop: 5,
    color: "gray",
  },
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
