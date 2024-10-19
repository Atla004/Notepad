import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";
import { useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { NoteContext } from "@/app/NoteContext";
import { fetchData } from "@/services/localstorage";
import { editNote } from "@/services/notes";

interface NoteHtmlProps {
  setContent: (value: string) => void;
}

export const NoteHtml = ({ setContent }: NoteHtmlProps) => {
  const { noteData, setNoteData } = useContext(NoteContext);
  const [editorContent, setEditorContent] = useState<String>();
  const navigation = useNavigation();

  const cambiostate = (content: string) => {
    setEditorContent(content);
  };

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: noteData.description,
    onChange: async () => {
      try {
        const content = await editor.getHTML();
        cambiostate(content);
      } catch (error) {
        console.log("Error al obtener el contenido de la nota");
      }
    }, 
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
      const { title, _id, favorite, categories, priority } = noteData;
      cambiostate((noteData.description as string) ?? "");
    }, [])
  );

  const guardarNota = async () => {
    try {
      const username = await fetchData("username");
      const { title, _id, favorite, categories, priority } = noteData;
      const dataToSave = {
        title,
        _id: _id ?? "",
        favorite,
        categories: categories ?? [],
        content: (editorContent as string) ?? "",
        priority,
      };
      console.log("dataToSave", dataToSave);
      editNote(username, dataToSave);
      console.log("Nota guardada");
    } catch (error) {
      console.log("Error al guardar la nota", error);
    }
  };

  return (
    <>
      <RichText editor={editor} />
      <KeyboardAvoidingView style={exampleStyles.keyboardAvoidingView}>
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </>
  );
};

const exampleStyles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
