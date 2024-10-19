import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { NoteContext } from "@/app/NoteContext";
import { editJSONData, fetchData, getJSONData } from "@/services/localstorage";
import { editNote } from "@/services/notes";
import { Text } from "react-native-paper";

export const NoteHtml = () => {
  const { noteData, setNoteData } = useContext(NoteContext);
  const [editorContent, setEditorContent] = useState<string>(
    noteData.description ?? ""
  );
  const [remainingChars, setRemainingChars] = useState<number>(
    100 - (noteData.description?.length ?? 0)
  );
  const navigation = useNavigation();

  const cambiostate = (content: string) => {
    setEditorContent(content);
  };

  const handleEditorChange = async () => {
    try {
      const content = await editor.getHTML();
      const text = await editor.getText();
      if (text.length <= 250) {
        setEditorContent(content);
        cambiostate(content);
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
    initialContent: noteData.description,
    onChange: handleEditorChange,
  });

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener("beforeRemove", async (e) => {
        console.log("lo que se va a guardar", editorContent);
        await guardarNota();
      });

      return unsubscribe;
    }, [navigation, editorContent])
  );

  useFocusEffect(
    useCallback(() => {
      cambiostate((noteData.description as string) ?? "");
    }, [])
  );

  const guardarNota = async () => {
    try {
      const username = await fetchData("username");
      console.log("NOteHTML", JSON.stringify(noteData, null, 2));
      await editJSONData("active-note", { content: editorContent });
      const dataToSave = await getJSONData("active-note");
      console.log("dataToSave", editorContent);
      console.log("dataToSave", dataToSave);

      editNote(username, dataToSave);

      console.log("Nota guardada");
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
