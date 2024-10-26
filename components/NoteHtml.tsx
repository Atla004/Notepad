import { CodeBridge, darkEditorTheme, RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import {  fetchData } from "@/services/localstorage";
import { editNote } from "@/services/notes";
import { Text, useTheme } from "react-native-paper";
import { NoteRequest } from "@/types/apiResponses";
import { editLocalNote } from "@/services/notelocalstorage";
import { notify } from "@alexsandersarmento/react-native-event-emitter";

interface NoteHtmlProps {
  content: string;
  _id: string;
  favorite: boolean;  
}

export const NoteHtml = ({ content,_id , favorite}: NoteHtmlProps) => {
  const refFavorite = useRef<boolean>(favorite);
  const editorContent = useRef<string>("");
  const [charactersNumber, setCharacterNumber] = useState<number>(0);
  console.log("NoteHtml", content, _id, favorite);
  const refLoading = useRef<boolean>(true);

  useEffect(() => {
    refFavorite.current = favorite;
    try {
      editorReady();
    }
    catch (err) {}
    return () => {
    }
  },[/* favorite */, content]);

  useEffect(()=> {
    refFavorite.current = favorite;
  }, [favorite])

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
        await new Promise((resolve) => setTimeout(resolve, 70)); 
      }
    };
    editorContent.current = content;
    
    await waitForEditor(); // Esperar hasta que el editor esté listo
    editor.setContent(editorContent.current);
    editor.setEditable(true);
    refLoading.current = false;

    
    const currentCharacterCount = (await editor.getText()).length;
    setCharacterNumber(currentCharacterCount);
    notify('allowGoBack');
  };

  const handleEditorChange = async () => {
    try {
      const [content, text] = await Promise.all([editor.getHTML(), editor.getText()]);
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

  const theme = useTheme()  
  const [editorCSS, setEditorCSS] = useState<string>(`
    code {
      background-color: ${theme.colors.surface};
      border-radius: 0.25em;
      border-color: #e45d5d;
      border-width: 1px;
      border-style: solid;
      box-decoration-break: clone;
      color: ${theme.colors.onSurface};
      font-size: 0.9rem;
      padding: 0.25em;
  }  
  `)
  useEffect(()=> {

  }, [theme])
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: "",
    onChange: handleEditorChange,
    editable: false,
    // bridgeExtensions: [
    //   CodeBridge.configureCSS(editorCSS)
    // ]
  });

  const saveNoteContent = async () => {
    try {
      console.log("saveNoteContent method");
      const username = await fetchData("username");
      if (refLoading.current) {
        return
      }
      const dataToSave: NoteRequest = {
        _id,
        content :editorContent.current,
        favorite: refFavorite.current,
      };

      await Promise.all([ editNote(username, dataToSave), editLocalNote(dataToSave)]);

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
      <RichText editor={editor}/>
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
