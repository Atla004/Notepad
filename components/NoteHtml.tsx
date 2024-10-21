import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { editJSONData, fetchData, getJSONData } from "@/services/localstorage";
import { editNote } from "@/services/notes";
import { Text } from "react-native-paper";
import { NoteRequest } from "@/types/apiResponses";

interface NoteHtmlProps {
  content: string;
  _id: string;
  favorite: boolean;  
}

export const NoteHtml = ({ content,_id , favorite}: NoteHtmlProps) => {
  const refFavorite = useRef<boolean>(favorite);
  console.log("NoteHtml", content, favorite);
  const editorContent = useRef<string>("");
  const [charactersNumber, setCharacterNumber] = useState<number>(0);

  useEffect(() => {
    refFavorite.current = favorite;
    editorReady();
    return () => {
    }
  },[favorite,content]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log("REF", editorContent.current,refFavorite.current);
        saveNoteContent();
        setCharacterNumber(0);
      }
    }, [])
  );



  const editorReady = async () => {
    const waitForEditor = async () => {
      while (!editor.getEditorState().isReady) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Esperar 100ms antes de volver a verificar
      }
    };
    console.log("editorReady");
    editorContent.current = content;


    await waitForEditor(); // Esperar hasta que el editor esté listo

    editor.setContent(editorContent.current);
    editor.setEditable(true);
    
    console.log("ready editorContent:", editorContent.current ,"remaining:" ,charactersNumber);
    const currentCharacterCount = (await editor.getText()).length;
    setCharacterNumber(currentCharacterCount);
  };

  const handleEditorChange = async () => {
    try {
      const content = await editor.getHTML();
      const text = await editor.getText();
      if (text.length <= 250) {
        editorContent.current = content;
        setCharacterNumber(text.length);
      } else {
        Alert.alert(
          "Character Limit Exceeded",
          "You can only enter up to 250 characters."
        );
        editor.setContent(editorContent.current); // Revertir al contenido anterior
      }
    } catch (error) {
      console.log("Error al obtener el contenido de la nota", error);
    }
  };

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: "Loading...",
    onChange: handleEditorChange,
    editable: false,
  });

  const saveNoteContent = async () => {
    try {
      console.log("saveNoteContent method");
      const username = await fetchData("username");
      const dataToSave: NoteRequest = {
        _id,
        content :editorContent.current,
        favorite: refFavorite.current,
      };

/*       //local
      await editJSONData("active-note", { content: editorContent.current });
      // */
      await editNote(username, dataToSave);

      console.log("saveNoteContent method Finished");
    } catch (error) {
      console.log("Error al guardar la nota", error);
    }
  };

  return (
    <>
      <Text style={styles.charCount}>
        Characters remaining: {250 -charactersNumber}
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
