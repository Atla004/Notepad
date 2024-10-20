import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { editJSONData, fetchData, getJSONData } from "@/services/localstorage";
import { editNote } from "@/services/notes";
import { Text } from "react-native-paper";

interface NoteHtmlProps {
  content: string;
}

export const NoteHtml = ({ content }: NoteHtmlProps) => {
  const editorContent = useRef<string>("");
  const [remainingChars, setRemainingChars] = useState<number>();

  useFocusEffect(
    useCallback(() => {
      console.log(`conntent props, ${content}`);
      editorContent.current = "content";
      editorReady();


      return async () => {
        await saveNoteContent();
        setRemainingChars(0);
      };
    }, [])
  );

  useEffect(() => {
    editorContent.current = "content";
    console.log("editorContent after", editorContent.current);
  }, []);

  const editorReady = async () => {
    const waitForEditor = async () => {
      while (!editor.getEditorState().isReady) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Esperar 100ms antes de volver a verificar
      }
    };

    const waitForset = async () => {
      while (!(editorContent.current === "content")) {
        console.log("waiting for setEditorContent");
        editorContent.current = "content";
        console.log("editorContent after", editorContent.current);

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Esperar 100ms antes de volver a verificar
      }
    };

    editorContent.current = "content";
    await waitForset();

    await waitForEditor(); // Esperar hasta que el editor esté listo
    console.log(
      "editorReady method after waitForEditor",
      content,
      "aaaa",
      editorContent
    );
    editor.setContent(editorContent.current);
    editor.setEditable(true);
    console.log(" ready editorContent", editorContent.current);
    setRemainingChars(250 - (await editor.getText()).length);
  };

  const handleEditorChange = async () => {
    try {
      const content = await editor.getHTML();
      const text = await editor.getText();
      if (text.length <= 250) {
        editorContent.current = content;
        console.log("content", content, "length", content.length);
        setRemainingChars(250 - text.length);
        console.log("remainingChars", remainingChars);
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
      console.log("before editorContent", editorContent);
      await editJSONData("active-note", { content: editorContent });
      const dataToSave = await getJSONData("active-note");
      console.log("editor contet after ", editorContent);

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
